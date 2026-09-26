export const API = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    ME: "/api/auth/me",
    LOGOUT: "/api/auth/logout",
    REFRESH_TOKEN: "/api/auth/refresh-token",
    VERIFY_EMAIL: "/api/auth/verify-email",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
  },

  VENUE: {
    GET_ALL: "/api/venues",
  },

  PACKAGE: {
    GET_ALL: "/api/packages",
  },

  AVAILABILITY: {
    GET: "/api/availability",
  },

  BOOKING: {
    CREATE: "/api/bookings",
    MY_BOOKINGS: "/api/bookings/my-bookings",
  },

  CONTACT: {
    ENQUIRY: "/api/contact/enquiry",
  },
};