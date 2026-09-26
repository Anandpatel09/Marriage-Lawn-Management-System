import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

// ---------------------------------------------
// Main API client
// ---------------------------------------------

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------
// Separate refresh client
// ---------------------------------------------

const refreshClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// ---------------------------------------------
// REQUEST INTERCEPTOR
// ---------------------------------------------

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) =>
    Promise.reject(error)
);

// ---------------------------------------------
// RESPONSE INTERCEPTOR
// ---------------------------------------------

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | (InternalAxiosRequestConfig & {
            _retry?: boolean;
          })
        | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status =
      error.response?.status;

    const responseData =
      error.response?.data as
        | {
            code?: string;
          }
        | undefined;

    // Only refresh when ACCESS TOKEN expired
    if (
      status === 401 &&
      responseData?.code ===
        "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response =
          await refreshClient.post(
            "/api/auth/refresh-token"
          );

        const newAccessToken =
          response.data.accessToken;

        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosInstance(
          originalRequest
        );

      } catch (refreshError) {
        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "user"
        );

        window.location.href =
          "/login";

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;