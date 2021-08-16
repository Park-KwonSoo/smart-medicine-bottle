import { client } from "./client";

export default {
    register : (Data : FormData) => {
        return client.post('/auth/register', Data);
    },

    registerDoctor : (Data : FormData) => {
        return client.post('/auth/register/doctor', Data);
    },

    login : (Data : FormData) => {
        return client.post('/auth/login', Data);
    },

    logout : () => {
        return client.post('/auth/logout');
    },
};