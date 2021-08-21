import React, { useState, useEffect } from "react";

import { RouteComponentProps} from 'react-router-dom';

import { useRecoilValue } from "recoil";
import * as recoilUtil from '../../../util/recoilUtil';

import * as Alert from '../../../util/alertMessage';
import ManagerMenuPresenter from "./ManagerMenuPresenter";

import { managerApi } from '../../../api';


type ManagerMenuProps = RouteComponentProps;

const ManagerMenuContainer = (props : ManagerMenuProps) => {

    const token = useRecoilValue(recoilUtil.token);

    const [doctorRegReqList, setDoctorRegReqList] = useState<any>([]);
    
    const [doctorDetail, setDoctorDetail] = useState<any>({});
    const [modalUp, setModalUp] = useState<boolean>(false);
    


    const fetchData = async() => {
        setModalUp(false);

        try {
            await managerApi.getDoctorRegReqList(token)
                .then((res : any) => {
                    if(res.statusText === 'OK') {
                        setDoctorRegReqList(res.data.doctorRegReqList);
                    }
                }).catch(err => {
                    Alert.onError(err.response.data.error, () => null);
                })
        } catch(e) {
            Alert.onError(e.response.data.error, () => null);
        }
    };


    const onViewDetailReq = async (doctorId : string) => {
        try {
            await managerApi.getDoctorRegReqDetail(token, doctorId)
                .then((res : any) => {
                    if(res.statusText === 'OK') {
                        setDoctorDetail(res.data.doctorInfo);
                        setModalUp(true);
                    }
                })
        } catch(e) {
            Alert.onError(e.response.data.error, () => setModalUp(false));
        }
    };

    //회원 가입 수락
    const onAcceptRequest = () => {
        const onAccept = async() => {
            try {
                await managerApi.acceptDoctorRegReq(token, doctorDetail)
                    .then((res : any) => {
                        if(res.statusText === 'OK') {
                            Alert.onSuccess('회원 등록이 완료되었습니다.', fetchData);
                        }
                    })
            } catch(e) {
                Alert.onError(e.response.data.error, () => setModalUp(false));
            }
        };

        Alert.onCheck('회원 가입 요청을 수락하시겠습니까?', onAccept, () => null);
    };

    //회원 가입 거절
    const onRejectRequest = () => {
        const onReject = async() => {
            try {
                await managerApi.rejectDoctorRegReq(token, doctorDetail)
                    .then((res : any) => {
                        if(res.statusText === 'OK') {
                            Alert.onSuccess('회원 등록이 취소되었습니다.', fetchData);
                        }
                    })
            } catch(e) {
                Alert.onError(e.response.data.error, () => setModalUp(false));
            }
        };

        Alert.onCheck('회원 가입 요청을 취소하시겠습니까?', onReject, () => null);
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ManagerMenuPresenter
            doctorRegReqList = {doctorRegReqList}

            doctorDetail = {doctorDetail}
            modalUp = {modalUp}
            setModalUp = {setModalUp}
            onViewDetailReq = {onViewDetailReq}

            onAcceptRequest = {onAcceptRequest}
            onRejectRequest = {onRejectRequest}
        />
    );
};

export default ManagerMenuContainer;