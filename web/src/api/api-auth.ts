import { client } from "./client";

export const authApi = {
    register : (Data : Object) => {
        return client.post('/auth/register', Data);
    },

    login : (Data : Object) => {
        return client.post('/auth/login', Data);
    },

    logout : () => {
        return client.post('/auth/logout');
    },
};