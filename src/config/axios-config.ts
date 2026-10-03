import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";


const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config: any) => {
        console.log("➡️ FULL REQUEST URL:", config.baseURL + config.url);
        return config;
    },
    (error: AxiosError) => {
        console.error("Request Error from axios:", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {


        // 401 is an expected answer for logged-out users; don't flag it as an error.
        if (error.response?.status !== 401) {
            console.error("Response Error from axios:", error);
        }
        // if (error.status === 401 && typeof window !== "undefined") {
        //     const currentPath = window.location.pathname;
        //     if (currentPath !== "/login") {   // only redirect if not already on login
        //         localStorage.removeItem("_at");
        //         localStorage.removeItem("_role");
        //         window.location.href = "/login";
        //     }
        // }


        const data = error?.response?.data;
        return Promise.reject(
            data && typeof data === "object"
                ? {...data, status: error.response?.status}
                : data
        );
    }
);

export default axiosInstance;


