import axios from "axios";
import { AuthContext } from "./store/AuthContext";
import { useContext } from "react";


export const useAxios = () => {
    let baseUrl = "http://localhost:8000/api";
    const { accessToken, setAccessToken, logout } = useContext(AuthContext);

    const api = axios.create({
        baseURL : baseUrl,
        withCredentials: true        
    });

    api.interceptors.request.use(
        (config) => {
            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`
            }
            return config
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                try {
                    const res = await axios.post(
                        `${baseUrl}/refresh/`,
                        {},
                        {withCredentials: true}
                    );
                    setAccessToken(res.data.access)
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${res.data.access}`;
                    return api(originalRequest)
                } catch (refreshError) {
                    logout();
                    return Promise.reject(refreshError)
                }
            }
            return Promise.reject(error)
        }
    )
    return api;
}