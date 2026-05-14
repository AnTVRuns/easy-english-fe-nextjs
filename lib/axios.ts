import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      try {
        // eslint-disable-next-line no-console
        console.debug('[axios response error]', error?.response?.status, error?.response?.data);
      } catch (e) {
        // ignore
      }
    }
    return Promise.reject(error);
  },
);

// Log requests in development to help debug auth issues (payload, url)
if (process.env.NODE_ENV === 'development') {
  axiosInstance.interceptors.request.use((config) => {
    try {
      // eslint-disable-next-line no-console
      console.debug('[axios request]', config.method, config.url, config.data ?? config.params ?? '');
    } catch (e) {
      // ignore logging errors
    }
    return config;
  });
}

export const get = async (path: string, options: AxiosRequestConfig = {}) => {
  return axiosInstance.get(path, options);
};

export const post = async (path: string, data?: any, options: AxiosRequestConfig = {}) => {
  return axiosInstance.post(path, data, options);
};

export const put = async (path: string, data?: any, options: AxiosRequestConfig = {}) => {
  return axiosInstance.put(path, data, options);
};

export const del = async (path: string, options: AxiosRequestConfig = {}) => {
  return axiosInstance.delete(path, options);
};

export const handleResponse = (response: any, successCode: number) => {
  return response?.status === successCode ? response.data : null;
};

export default axiosInstance;
