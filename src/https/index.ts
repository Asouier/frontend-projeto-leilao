import { obterTokenApi } from "@/services/token";
import axios, { AxiosRequestConfig } from "axios";

const urlBase = process.env.VUE_APP_API_URL;

const http = axios.create({
  baseURL: urlBase,
});

http.interceptors.request.use(
  async (config) => {
    const data = await obterTokenApi();
    config.headers.Authorization = `Bearer ${data.accessToken}`;
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);
class AxiosCall {
  async axiosCall<T = never>(config: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await http.request(config);
      return data;
    } catch (error) {
      console.error("Request Error:", error); // Debug log
      throw error;
    }
  }
}
export { AxiosCall };
