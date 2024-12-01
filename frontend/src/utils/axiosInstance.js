import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.data.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await axiosInstance.post("/refresh-token");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
