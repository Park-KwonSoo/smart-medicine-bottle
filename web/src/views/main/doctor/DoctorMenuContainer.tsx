import React, { useState, useEffect } from 'react';
import { RouteComponentProps} from 'react-router-dom';

import DoctorMenuPresenter from './DoctorMenuPresenter';

import { useRecoilState, useRecoilValue } from 'recoil';
import * as recoilUtil from '../../../util/recoilUtil';

import { doctorApi, authApi } from '../../../api';


type DoctorMenuProps = RouteComponentProps

const DoctorMenuContainer = (props : DoctorMenuProps) => {

    const token = useRecoilValue(recoilUtil.token);

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

    const [patientDetail, setPatientDetail] = useState<any>();

    const [editModal, setEditModal] = useState<boolean>(false);
    const [newPatientRegisterModal, setNewPatientRegisterModal] = useState<boolean>(false);
    const [newPatientSearchId, setNewPatientSearchId] = useState<string>('');



    const fetchData = async() => {
        try {
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
        } catch(e) {
            console.log(e);
        }
    };

    const onSetKeyword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchPatientKeyword(e.target.value);
    };

    const onFetchPatientDetail = async (patientId : string) => {
        try {
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
        } catch(e) {
            console.log(e);
        }
    };

    const onInitialize = () => {
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
        setPatientDetail(null);
    };


    const onSetNewPatientSearchId = (e : React.ChangeEvent<HTMLInputElement>) => {
        setNewPatientSearchId(e.target.value);
    };

    const onSearchNewPatientByEmail = async () => {
        try {
            await doctorApi.searchPatientById(token, newPatientSearchId).then(res => {
                console.log(res.data);
            }).catch(err => console.log(err));
        } catch(e) {
            console.log(e);
        }
    };


    const onGoBottleDetail = (bottleId : number) => {
        console.log(bottleId);
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

            newPatientRegisterModal = {newPatientRegisterModal}
            setNewPatientRegisterModal = {setNewPatientRegisterModal}
            newPatientSearchId = {newPatientSearchId}
            onSetNewPatientSearchId = {onSetNewPatientSearchId}
            onSearchNewPatientByEmail = {onSearchNewPatientByEmail}
        />
    );
};

export default DoctorMenuContainer;