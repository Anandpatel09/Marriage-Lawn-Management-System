export const API = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    ME: "/api/auth/me",
    LOGOUT: "/api/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    VERIFY_EMAIL: "/auth/verify-email",

    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
  },

  //   USER: {
  //     PROFILE: "/api/user/profile",
  //     UPDATE_PROFILE: "/api/user/profile",
  //   },

  //   BOOKING: {
  //     CREATE: "/api/bookings",
  //     GET_ALL: "/api/bookings",
  //     GET_BY_ID: (id: number | string) => `/api/bookings/${id}`,
  //     DELETE: (id: number | string) => `/api/bookings/${id}`,
  //   },
};
