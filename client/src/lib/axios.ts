import axios from "axios";

// Configure global axios defaults
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

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
      console.error("Failed to parse token from localStorage", error);
    }
  }
  return config;
});

export default axios;
