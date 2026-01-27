import axios from 'axios';

/**
 * 사용법:
 * import { axiosInstance as axios } from '@/lib/axios';
 * - axios.get('/endpoint');
 * - axios.post('/endpoint', data);
 * - axios.put('/endpoint', data);
 * - axios.delete('/endpoint');
 */

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // do something before request is sent, e.g., add auth token
        return config;
    },
    (error) => Promise.reject(error),
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // do something with response data
        return response;
    },
    (error) => {
        // handle errors globally, e.g., 401 Unauthorized logout
        return Promise.reject(error);
    },
);
