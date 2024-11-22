import axios, { AxiosInstance } from "axios";

export const apiInstance :AxiosInstance = axios.create({
    // baseURL: "http://localhost:3001"
    // baseURL: "https://nckh-project.onrender.com"
    baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1`
})

// Add a request interceptor
apiInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
apiInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response && response.data) return response.data;
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error?.respone?.data) return error?.respone?.data;
    return Promise.reject(error);
  });
