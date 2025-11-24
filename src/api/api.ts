import axios ,{type AxiosRequestConfig, type AxiosResponse,type AxiosError} from "axios";

import {type Result} from "../types/api";
import {message as M} from "antd";


const api = import.meta.env.VITE_BASE_URL; // /api

// 创建 axios 实例
const axiosInstance = axios.create({
	baseURL: api,
	timeout: 50000,
	headers: { "Content-Type": "application/json;charset=utf-8" },
});

axiosInstance.interceptors.request.use(
    (config) => {        
		// 在请求被发送之前做些什么
		config.headers.Authorization = `Bearer Token ${localStorage.getItem("token")}`;
		return config;
	},
	(error) => {
		// 请求错误时做些什么
		return Promise.reject(error);
	},
)

axiosInstance.interceptors.response.use(
    (res: AxiosResponse<any>) => {
        
		if (!res.data) throw new Error("请求无内容");

		const { code, message, msg } = res.data;

        if(code!=200){
            // 业务请求错误
            // throw new Error(msg||message);              
            M.error(msg||message)          
            if(code==401){
                // 未登录
                // window.location.href = "/login";
            }else if(code==403){
                // 无权限
                // window.location.href = "/403";
            }else if(code==404){
                // 未找到
                // window.location.href = "/404";
            }else if(code==500){
                // 服务器错误
                // window.location.href = "/500";
            }  
            return res.data;
        }else{
            return res.data;
        }
	},
	(error: AxiosError<Result>) => {
		return Promise.reject(error);
	},
)

class APIClient {
	get<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "GET" });
	}

	post<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "POST" });
	}

	put<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "PUT" });
	}

	delete<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "DELETE" });
	}

	request<T = any>(config: AxiosRequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.request<any, AxiosResponse<Result>>(config)
				.then((res: AxiosResponse<Result>) => {
					resolve(res as unknown as Promise<T>);
				})
				.catch((e: Error | AxiosError) => {
					reject(e);
				});
		});
	}
}
export default new APIClient();


