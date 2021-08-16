import { client } from "./client";
import { RecoilState } from "recoil";

export const doctorApi = {
    getPatientList : (token : RecoilState<any>) => {
        return client.get('/doctor/patient', {
            headers : {
                Authorization : token,
            },
        });
    },
    getPatientDetail : (token : RecoilState<any>, PatientId : string) => {
        return client.get(`/doctor/patient/${PatientId}`, {
            headers : {
                Authorization : token,
            },
        });
    },
    getPatientBottleDetail : (token : RecoilState<any>, BottleId : string) => {
        return client.get(`/doctor/bottle/${BottleId}`, {
            headers : {
                Authorization : token,
            },
        });
    },
    writePatientInfo : (token : RecoilState<any>, Data : FormData) => {
        return client.patch('/doctor/patient', Data, {
            headers : {
                Authorization : token,
            },
        });
    },
    writeBottleFeedback : (token : RecoilState<any>, Data : FormData) => {
        return client.post('/doctor/bottle', Data, {
            headers : {
                Authorization : token,
            },
        });
    },
    registerPatient : (token : RecoilState<any>, Data : FormData) => {
        return client.post('/doctor/patient', Data, {
            headers : {
                Authorization : token,
            },
        });
    },
    removePatient : (token : RecoilState<any>, PatientId : string) => {
        return client.delete(`/doctor/patient/${PatientId}`, {
            headers : {
                Authorization : token,
            },
        });
    },
};