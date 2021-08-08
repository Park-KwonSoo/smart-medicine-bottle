import axios, { AxiosInstance } from 'axios';

require('dotenv').config();
const { BASE_URL } = process.env;

export const client : AxiosInstance = axios.create({
    baseURL : BASE_URL,
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
        return error;
    }
);
