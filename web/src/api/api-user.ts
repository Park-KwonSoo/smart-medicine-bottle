import { client } from './client';
import { RecoilState } from 'recoil';

export default {
    getMyInfo : (token : RecoilState<any>) => {
        return client.get('/user', {
            headers : {
                Authorization : token,
            },
        });
    },
    getDoctorRegisterRequest : (token : RecoilState<any>) => {
        return client.get('/user/doctorrequest', {
            headers : {
                Authorization : token,
            },
        });
    },
    acceptDoctorRegister : (token : RecoilState<any>, Data : any) => {
        return client.post('/user/doctorrequest/', Data, {
            headers : {
                Authorization : token,
            }
        });
    },
};