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
    const [validate, setValidate] = useState<string>('W');
    const [validateDoctorLicense, setValidateDoctorLicense] = useState<string>('');
    


    const fetchData = async() => {
        setModalUp(false);
        setValidate('W');

        try {
            await managerApi.getDoctorRegReqList(token)
                .then((res : any) => {
                    if(res.statusText === 'OK') {
                        setDoctorRegReqList(res.data.doctorRegReqList);
                    }
                }).catch(err => {
                    Alert.onError(err.response.data.error, () => null);
                })
        } catch(e : any) {
            Alert.onError(e.response.data.error, () => null);
        }
    };


    const onViewDetailReq = async (doctorId : string) => {
        setValidate('W');

        try {
            await managerApi.getDoctorRegReqDetail(token, doctorId)
                .then((res : any) => {
                    if(res.statusText === 'OK') {
                        setDoctorDetail(res.data.doctorInfo);
                        setModalUp(true);
                    }
                })
        } catch(e : any) {
            Alert.onError(e.response.data.error, () => setModalUp(false));
        }
    };

    const onViewLicenseDetail = async (url : string) => {
        const licensePage : any = window.open(url);
        licensePage.focus();
    };

    //자격 확인 문서를 보고, 면허 번호를 입력하는 함수
    const onSetValidateDoctorLicense = (e : React.ChangeEvent<HTMLInputElement>) => {
        setValidateDoctorLicense(e.target.value);
    };

    //회원 가입 수락
    const onAcceptRequest = () => {
        if(validate === 'W') {
            Alert.onError('먼저 의사의 자격번호가 유효한지 검증해주세요.', () => null);
            return;
        } else if(validate === 'N') {
            Alert.onError('유효한 자격 번호가 아닙니다.', () => null);
            return;
        }

        const onAccept = async() => {
            try {
                await managerApi.acceptDoctorRegReq(token, {
                    doctorId : doctorDetail.doctorId,
                    validateDoctorLicense,
                }).then((res : any) => {
                    if(res.statusText === 'OK') {
                        Alert.onSuccess('회원 등록이 완료되었습니다.', fetchData);
                    }
                });
            } catch(e : any) {
                Alert.onError(e.response.data.error, () => setModalUp(false));
            }
        };

        Alert.onCheck('회원 가입 요청을 수락하시겠습니까?', onAccept, () => null);
    };

    //회원 가입 거절
    const onRejectRequest = () => {
        const onReject = async() => {
            try {
                await managerApi.rejectDoctorRegReq(token, {
                    doctorId : doctorDetail.doctorId,
                }).then((res : any) => {
                    if(res.statusText === 'OK') {
                        Alert.onSuccess('회원 등록이 취소되었습니다.', fetchData);
                    }
                });
            } catch(e : any) {
                Alert.onError(e.response.data.error, () => setModalUp(false));
            }
        };

        Alert.onCheck('회원 가입 요청을 취소하시겠습니까?', onReject, () => null);
    };

    const onValidate = async () => {
        try {
            await managerApi.validateDoctorLicense(token, {
                validateDoctorLicense,
            }).then(res => {
                if(res.statusText === 'OK') {
                    setValidate(res.data.result ? 'Y' : 'N');
                }
            }).catch(err => {
                Alert.onError(err.response.data.error, () => {
                    setModalUp(false);
                    setValidate('W');
                });
            })
        } catch(e : any) {
            Alert.onError(e.response.data, () => {
                setModalUp(false);
                setValidate('W');
            });
        }
    };

    
    useEffect(() => {
        setValidate('W');
        setValidateDoctorLicense('');
    }, [modalUp]);

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
            onViewLicenseDetail = {onViewLicenseDetail}
            
            validate = {validate}
            onValidate = {onValidate}

            validateDoctorLicense = {validateDoctorLicense}
            onSetValidateDoctorLicense = {onSetValidateDoctorLicense}

            onAcceptRequest = {onAcceptRequest}
            onRejectRequest = {onRejectRequest}
        />
    );
};

export default ManagerMenuContainer;