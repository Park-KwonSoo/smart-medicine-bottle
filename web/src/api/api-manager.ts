import { client } from './client';
import { RecoilState } from 'recoil';

export default {
    getDoctorRegReqList : (token : RecoilState<any>) => {
        return client.get('/manage/doctor', {
            headers : {
                Authorization : token,
            },
        });
    },
    getDoctorRegReqDetail : (token : RecoilState<any>, doctorId : string) => {
        return client.get(`/manage/doctor/${doctorId}`, {
            headers : {
                Authorization : token,
            },
        });
    },
    acceptDoctorRegReq : (token : RecoilState<any>, Data : any) => {
        return client.post('/manage/doctor/accept', Data, {
            headers : {
                Authorization : token,
            },
        });
    },
    rejectDoctorRegReq : (token : RecoilState<any>, Data : any) => {
        return client.post('/manage/doctor/reject', Data, {
            headers : {
                Authorization : token,
            },
        });
    },
    validateDoctorLicense : (token : RecoilState<any>, Data : any) => {
        return client.post('/manage/doctor/validate', Data, {
            headers : {
                Authorization : token,
            },
        });
    },
};