import axios from "axios";
import { notify } from "./toast";

// Configure global axios defaults
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Add request interceptor to attach JWT token to all requests
axios.interceptors.request.use((config) => {
  const userJson = localStorage.getItem("user");

  if (userJson) {
    try {
      // The token is stored as JSON.stringify(token), so we just parse it
      const token = JSON.parse(userJson);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // Silent fail - token parsing error
    }
  }
  return config;
});

// Add response interceptor to handle 401 errors and token refresh
axios.interceptors.response.use(
  (response) => {
    // If response is successful, just return it
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        // No refresh token, logout user
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_token");
        notify("Your session has expired. Please login again.", "error");

        setTimeout(() => {
          window.location.href = "/signin";
        }, 1500);

        return Promise.reject(error);
      }

      try {
        // Call refresh endpoint
        const response = await axios.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        // Backend wraps response in { code, message, data }
        // Extract access_token from response.data.data
        const { access_token } = response.data.data;

        // Store new access token
        localStorage.setItem("user", JSON.stringify(access_token));

        // Update authorization header
        axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        processQueue(null, access_token);
        isRefreshing = false;

        // Retry original request
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Clear tokens and redirect to login
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_token");

        notify("Your session has expired. Please login again.", "error");

        setTimeout(() => {
          window.location.href = "/signin";
        }, 1500);

        return Promise.reject(refreshError);
      }
    }

    // Return the error for further handling
    return Promise.reject(error);
  }
);

export default axios;
