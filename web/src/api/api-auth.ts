import { client } from "./client";

export default {
    register : (Data : any) => {
        return client.post('/auth/register', Data);
    },

    searchHospital : (hospitalNm : string, page : number) => {
        return client.get('/auth/hospital', {
            params : {
                hospitalNm,
                page,
            },
        });
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
    verifyToken : (token : any) => {
        return client.get('/auth/verifytoken', {
            headers : {
                Authorization : token,
            },
        });
    },
};