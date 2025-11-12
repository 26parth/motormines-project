import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// ✅ Auto refresh token when 401 occurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Agar token expired hai
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔄 Refresh token
        await axios.post("http://localhost:3000/api/admin/refresh", {}, { withCredentials: true });

        // 🔁 Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
