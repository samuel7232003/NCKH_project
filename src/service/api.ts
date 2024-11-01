import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const apiInstance :AxiosInstance = axios.create({
    // baseURL: "http://localhost:3001"
    baseURL: "https://nckh-project.onrender.com"
})

export const handleError = (error: any) => {
    if (error.response) {
        switch(error.response.status){
            case 401: { console.log(error.response); break; }
            case 409: { console.log(error.response); break; }
            case 404: { console.log(error.response); break; }
            case 500: { console.log(error.response); break; }
            default: console.log(error.response);
        }
    } else {
        console.error('Lỗi không có response:', error.message || error);
    }
};

apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('userData')?.replaceAll('"','');
        if(token){
            config.headers.Authorization = token;
        }
        return config;
    },
    handleError
)

apiInstance.interceptors.response.use(
    (respone: AxiosResponse) => respone,
    handleError
);