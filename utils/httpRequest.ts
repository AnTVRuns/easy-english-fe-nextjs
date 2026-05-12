import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const httpRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
});

httpRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const get = async (path: string, options: AxiosRequestConfig = {}) => {
  try {
    return await httpRequest.get(path, options);
  } catch (e: any) {
    throw e;
  }
};

export const post = async (path: string, data?: any, options: AxiosRequestConfig = {}) => {
  try {
    return await httpRequest.post(path, data, options);
  } catch (e: any) {
    throw e;
  }
};

export const put = async (path: string, data?: any, options: AxiosRequestConfig = {}) => {
  try {
    return await httpRequest.put(path, data, options);
  } catch (e: any) {
    throw e;
  }
};

export const del = async (path: string, options: AxiosRequestConfig = {}) => {
  try {
    return await httpRequest.delete(path, options);
  } catch (e: any) {
    throw e;
  }
};

export const handleResponse = (response: any, successCode: number) => {
  return response?.status === successCode ? response.data : null;
};

export default httpRequest;
