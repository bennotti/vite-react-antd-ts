import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import { authorizationHeaderInterceptor } from './interceptors/authorization-header.interceptor';

import { env } from '../env';

export const baseApi: AxiosInstance = axios.create({
    baseURL: env.BASE_API_URL,
    paramsSerializer: qs.stringify,
    headers: {
      'Access-Control-Allow-Origin': 'no-cors',
      'Content-Type': 'application/json',
    },
});

baseApi.interceptors?.request.use(authorizationHeaderInterceptor);