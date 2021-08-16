import { client } from "./client";

export default {
    register : (Data : any) => {
        return client.post('/auth/register', Data);
    },

    registerDoctor : (Data : any) => {
        return client.post('/auth/register/doctor', Data);
    },

    login : (Data : any) => {
        return client.post('/auth/login', Data);
    },

    logout : () => {
        return client.post('/auth/logout');
    },
};