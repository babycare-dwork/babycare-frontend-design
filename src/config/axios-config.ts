import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: "/api/proxy",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: AxiosError) => {
    console.error("Request Error:", error.message);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    // 401 is expected for logged-out users; don't log it.
    if (error.response?.status !== 401) {
      console.error(
        "Response error:",
        error.response?.status,
        error.config?.url,
        error.message,
      );
    }

    const data = error?.response?.data;
    return Promise.reject(
      data && typeof data === "object"
        ? { ...data, status: error.response?.status }
        : data,
    );
  },
);

export default axiosInstance;
