import axios from "axios";
import {BASE_URL} from "../config";
import {localStorageService} from "./localStorage.service";

const http = axios.create({
    baseURL: BASE_URL
})

http.interceptors.request.use(
    async function (config) {
        const accessToken = localStorageService.getAccessToken()

        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`
            }
        }
        return config
    },
    function (error) {
        return Promise.reject(error);
    }
)

export const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    patch: http.patch,
    delete: http.delete
}