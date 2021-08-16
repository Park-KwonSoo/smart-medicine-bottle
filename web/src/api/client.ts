import axios, { AxiosInstance } from 'axios';
import { baseURL } from '../config/config';

export const client : AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

client.interceptors.request.use(

);

client.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.log(error);
        return error;
    }
);
