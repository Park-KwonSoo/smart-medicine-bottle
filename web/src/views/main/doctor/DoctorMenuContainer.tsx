import React, { useState, useEffect } from 'react';
import { RouteComponentProps} from 'react-router-dom';

import DoctorMenuPresenter from './DoctorMenuPresenter';

import { useRecoilState, useRecoilValue } from 'recoil';
import * as recoilUtil from '../../../util/recoilUtil';

import * as Alert from '../../../util/alertMessage';

import { doctorApi, medicineApi } from '../../../api';


//toDo : Generate QR Code By Medicine Id

type DoctorMenuProps = RouteComponentProps

const DoctorMenuContainer = (props : DoctorMenuProps) => {

    const token = useRecoilValue(recoilUtil.token);
    const [loading, setLoading] = useRecoilState(recoilUtil.loading);

    const [doctorInfo, setDoctorInfo] = useState<any>({
        doctorNm : '',
        doctorType : '',
        hospitalNm : '',
        hospitalAddr : '',
        contact : '',
    });

    const [patientList, setPatientList] = useState<any>([]);

    const [info, setInfo] = useState<any>({
        infoType : 'DOCTOR',
        userNm : '',
        userAge : 0,
        contact : '',
        doctorType : '',
        patientInfo : '',
    });

    const [searchPatientKeyword, setSearchPatientKeyword] = useState<string>('');
    const [filteringPatientList, setFilteringPatientList] = useState<any>([]);
    
    const [patientDetail, setPatientDetail] = useState<any>(null);

    const [editModal, setEditModal] = useState<boolean>(false);
    const [editPatientInfo, setEditPatientInfo] = useState<string>(''); 

    const [newPatientRegisterModal, setNewPatientRegisterModal] = useState<boolean>(false);
    const [newPatientSearchId, setNewPatientSearchId] = useState<string>('');
    const [newPatientSearchResult, setNewPatientSearchResult] = useState<any | null>(null);

    const [prescribeModal, setPrescribeModal] = useState<boolean>(false);
    const [searchMedicineKeyword, setSearchMedicineKeyword] = useState<string>('');
    const [medicineList, setMedicineList] = useState<any>([]);
    const [prescribeMedicine, setPrescribeMedicine] = useState<any>(null);


    const fetchData = async() => {
        try {
            setLoading(true);
            const res = await doctorApi.getDoctorsInfo(token);
            if(res.statusText === 'OK') {
                const { doctorInfo } = res.data;
                setDoctorInfo(doctorInfo);
                setInfo({
                    infoType : 'DOCTOR',
                    userNm : doctorInfo.doctorNm,
                    doctorType : doctorInfo.doctorType,
                    contact : doctorInfo.contact,
                    userAge : null,
                    patientInfo : '',
                });

                //로그인한 환자의 리스트를 가져옴 : 프론트에서 필터로 검색
                await doctorApi.getPatientList(token).then(res => {
                    setPatientList(res.data.patientList);
                }).catch(error => console.log(error));
            }
            setLoading(false);
        } catch(e) {
            console.log(e);
            setLoading(false);
        }
    };

    const onSetKeyword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchPatientKeyword(e.target.value);
    };

    const onFetchPatientDetail = async (patientId : string) => {
        try {
            setLoading(true);
            await doctorApi.getPatientDetail(token, patientId).then(res => {
                setPatientDetail(res.data);
                setInfo({
                    infoType : 'PATIENT',
                    userNm : res.data.profile.userNm,
                    userAge : res.data.profile.userAge,
                    contact : res.data.profile.contact,
                    doctorType : null,
                    patientInfo : res.data.info,
                });
            }).catch(err => console.log(err));
            setLoading(false);
        } catch(e) {
            console.log(e);
            setLoading(false);
        }
    };

    const onInitialize = async () => {
        await fetchData();
        setPatientDetail(null);
        setInfo({
            infoType : 'DOCTOR',
            userNm : doctorInfo.doctorNm,
            doctorType : doctorInfo.doctorType,
            contact : doctorInfo.contact,
            userAge : null,
            patientInfo : '',
        });
        setFilteringPatientList([]);
        setSearchPatientKeyword('');
        onCloseModal();
    };

    const onEditPatientInfo = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditPatientInfo(e.target.value);
    };

    const onSubmitPatientInfo = () => {
        if(editPatientInfo.length && patientDetail) {
            const onSubmit = async () => {
                try {
                    const result = await doctorApi.writePatientInfo(token, {
                        patientId : patientDetail.profile.userId,
                        info : editPatientInfo,
                    });
                    if(result.statusText === 'OK') {
                        Alert.onSuccess('환자의 특이사항을 업데이트했습니다.', () => onInitialize());
                    } else {
                        Alert.onError('특이사항을 기록하는데 실패했습니다.', () => null);
                    }
    
                } catch(e : any) {
                    Alert.onError(e.response.data.error, () => null);
                }
            };

            Alert.onCheck('환자의 특이사항을 업데이트하시겠습니까?', onSubmit, () => null);

        } else {
            Alert.onError('환자의 특이사항을 기록하세요.', () => null);
        }
        
    };


    const onSetNewPatientSearchId = (e : React.ChangeEvent<HTMLInputElement>) => {
        setNewPatientSearchId(e.target.value);
    };

    const onSearchNewPatientByEmail = async () => {
        try {
            setLoading(true);
            await doctorApi.searchPatientById(token, newPatientSearchId).then(res => {
                setNewPatientSearchResult(res.data);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
                Alert.onError('검색 결과가 없습니다.', () => null);
                setNewPatientSearchResult(null);
            });
        } catch(e : any) {
            setLoading(false);
            Alert.onError(e.response.data.error, () => null);
        }
    };

    const onRegisterNewPatient = () => {
        if(newPatientSearchResult) {
            const { patientId, patientNm } = newPatientSearchResult;
            const onRegisterReq = async () => {
                try {
                    const result = await doctorApi.registerPatient(token, {
                        patientId,
                    });
                    if(result.statusText === 'OK') {
                        Alert.onSuccess('환자에게 담당의 등록 요청을 전송했습니다.', () => null);
                    } else {
                        Alert.onError('환자에게 담당의 등록 요청을 실패했습니다.', () => null);
                    }
                } catch(e : any) {
                    Alert.onError(e.response.data.error, () => null);
                }
            };

            Alert.onCheck(`${patientNm} 환자에게 담당의 등록 요청을 전송하시겠습니까?`, onRegisterReq, () => null);
        } else {
            Alert.onError('환자를 먼저 검색해주세요.', () => null);
        }
    };

    const onCloseModal = async () => {
        setNewPatientRegisterModal(false);
        setNewPatientSearchId('');
        setNewPatientSearchResult(null);
        setEditModal(false);
        setEditPatientInfo('');
        setPrescribeModal(false);
        setSearchMedicineKeyword('');
        setMedicineList([]);
        setPrescribeMedicine(null);
    };

    const onGoBottleDetail = (bottleId : number) => {
        props.history.push(`/bottle/${bottleId}`);
    };

    const onSetSearchMedicineKeyword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchMedicineKeyword(e.target.value);
    };

    const searchMedicine = async() => {
        setMedicineList([]);
        setPrescribeMedicine(null);
        try {
            setLoading(true);
            const res = await medicineApi.searchMedicine(token, searchMedicineKeyword);
            if(res.statusText === 'OK') {
                console.log(res.data.medicineList)
                setMedicineList(res.data.medicineList);
            }
            setLoading(false);
        } catch(e : any) {
            Alert.onError(e.response.data.error, () => null);
        }
    };

    const onPrescribeSubmit = async() => {
        //toDo : 처방해서, QR코드 생성
        Alert.onWarning('작업 중입니다.', () => null);
    };

    const onPrescribeCancel = () => {
        Alert.onCheck('취소하시면 작업중인 내용이 사라집니다.', () => {
            onCloseModal();
        }, () => null)
    };


    useEffect(() => {
        if(!token || !token.length) {
            props.history.push('/login');
        } else fetchData();
    }, []);

    useEffect(() => {
        setFilteringPatientList(searchPatientKeyword === '' ? [] :
            patientList.filter((patient : any) =>
                patient.contact.includes(searchPatientKeyword)
                || patient.userNm.includes(searchPatientKeyword)
                || patient.userId.includes(searchPatientKeyword)
            )
        );
    }, [searchPatientKeyword]);

    return (
        <DoctorMenuPresenter
            info = {info}
            searchPatientKeyword = {searchPatientKeyword}
            onSetKeyword = {onSetKeyword}

            filteringPatientList = {filteringPatientList}
            patientDetail = {patientDetail}
            onFetchPatientDetail = {onFetchPatientDetail}

            onInitialize = {onInitialize}
            onGoBottleDetail = {onGoBottleDetail}

            editModal = {editModal}
            setEditModal = {setEditModal}
            editPatientInfo = {editPatientInfo}
            onEditPatientInfo = {onEditPatientInfo}
            onSubmitPatientInfo = {onSubmitPatientInfo}

            newPatientRegisterModal = {newPatientRegisterModal}
            setNewPatientRegisterModal = {setNewPatientRegisterModal}
            newPatientSearchId = {newPatientSearchId}
            onSetNewPatientSearchId = {onSetNewPatientSearchId}
            onSearchNewPatientByEmail = {onSearchNewPatientByEmail}
            onRegisterNewPatient = {onRegisterNewPatient}
            onCloseModal = {onCloseModal}

            prescribeModal = {prescribeModal}
            setPrescribeModal = {setPrescribeModal}
            searchMedicineKeyword = {searchMedicineKeyword}
            onSetSearchMedicineKeyword = {onSetSearchMedicineKeyword}
            medicineList = {medicineList}
            searchMedicine = {searchMedicine}
            prescribeMedicine = {prescribeMedicine}
            setPrescribeMedicine = {setPrescribeMedicine}
            onPrescribeSubmit = {onPrescribeSubmit}
            onPrescribeCancel = {onPrescribeCancel}

            newPatientSearchResult = {newPatientSearchResult}
        />
    );
};

export default DoctorMenuContainer;