import {AxiosRequestConfig, AxiosResponse} from "axios";
import userStore from "../stores/AuthStore";
import serverStore from "./ServerStore";

const axios = require('axios').default;

let API_ROOT = serverStore.IPAddress;
export const API_IMAGE_PATH = `/uploads`;
export const AUTH_TOKEN_KEY = 'authorization';

/*const handleErrors = err => {
    if (err && err.response && err.response.status === 401)
    {
        // logout
    }
    return err;
};
*/

export default class ApiRequest {

    private static requestConfig(){
        const config : AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        if (userStore.user){
            config.headers['authorization'] = userStore.user.token;
        }
        return config;
    }

    static get<T>(url: string, params?: {}): Promise<AxiosResponse<T>> {
        const config = this.requestConfig();
        config.params = params;
        return axios.get(`${serverStore.IPAddress}/${url}`, config);
    }

    static post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        return axios.post(`${serverStore.IPAddress}/${url}`, data, this.requestConfig())
    }

    static put<T>(url: string, data: any): Promise<AxiosResponse<T>>{
        return axios.put(`${serverStore.IPAddress}/${url}`, data, this.requestConfig())
    }

    static delete<T>(url: string): Promise<AxiosResponse<T>>{
        return axios.delete(`${serverStore.IPAddress}/${url}`, this.requestConfig())
    }
}
