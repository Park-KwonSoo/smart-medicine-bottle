import React, { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router-dom';

import { useRecoilValue, useRecoilState } from "recoil";
import * as recoilUtil from '../../util/recoilUtil';

import validator from 'validator';
import * as Alert from '../../util/alertMessage';

import Header from '../../components/Header';
import RegisterPresenter from "./RegisterPresenter";

import { authApi } from '../../api';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RegisterProps extends RouteComponentProps {}

const RegisterContainer = (props : RegisterProps) => {

    const token = useRecoilValue(recoilUtil.token);
    const [loading, setLoading] = useRecoilState(recoilUtil.loading);

    const [registerForm, setRegisterForm] = useState<any>({
        userId : '',
        password : '',
        passwordCheck : '',
        info : {
            doctorLicense : '',
            hospitalNm : '',
            hospitalAddr : '',
            contact : '',
            doctorType : '',
            doctorNm : '',
        },
    });

    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    const [searchHospital, setSearchHospital] = useState<boolean>(false);
    const [hospitalNm, setHospitalNm] = useState<string>('');
    const [hospitalSearchPage, setHospitalSearchPage] = useState<number>(1);
    const [hospitalSearchPageList, setHospitalSearchPageList] = useState<number[]>([1]);
    const [hospitalList, setHospitalList] = useState<any[]>([]);
    const [selectHospital, setSelectHospital] = useState<any>(null);


    const fetchData = async() => {
        if(token && token.length) {
            const result = await authApi.verifyToken(token);
            if (result.statusText === 'OK') {
                props.history.push('/');
            }
        }
    };

    const onCancleRegister = () => {
        Alert.onCheck('회원가입을 취소하시겠습니까?', 
        () => props.history.push('/login'), 
        () => null);
    };

    const onGoBackPage = () => {
        if(page > 1) {
            setPage(page - 1);
        }
    };

    const validateRegisterForm = () => {
        if(page === 1) {
            if (!validator.isEmail(registerForm.userId)) {
                setError('회원 가입 ID는 이메일이어야 합니다.');
            } else if(registerForm.password === registerForm.password.toLowerCase()
                || !/\d/.test(registerForm.password)
            ) {
                setError('비밀번호는 최소 8자 이상이어야 하고, 대문자 및 숫자를 1개 이상 포함하고 있어야 합니다.');
            } else if(registerForm.password !== registerForm.passwordCheck) {
                setError('비밀번호가 일치하지 않습니다.')
            } else setError(null);
        } else if(page === 2) {
            if(!registerForm.info.doctorLicense.length &&
                 !validator.isAlphanumeric(registerForm.info.doctorLicense)) {
                setError('의사 자격 번호를 입력해야 합니다.');
            } else if(registerForm.info.doctorNm.length < 2) {
                setError('의사 이름을 올바르게 입력해야 합니다.');
            } else if(!registerForm.info.contact) {
                setError('연락처를 입력해주세요.');
            } else setError(null);
        } else if(page === 3) {
            if(!registerForm.info.doctorType.length) {
                setError('전문 분야를 입력해주세요.');
            } else if(!registerForm.info.hospitalNm || !registerForm.info.hospitalAddr) {
                setError('올바른 병원 정보를 입력해주세요');
            } else setError(null);
        }


    };


    const onSetUserId = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({
            ...registerForm,
            userId : e.target.value,
        });
    };

    const onSetPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({
            ...registerForm,
            password : e.target.value,
        });
    };

    const onSetPasswordCheck = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({
            ...registerForm,
            passwordCheck : e.target.value,
        });
    };

    const onSetDoctorLicense = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({
            ...registerForm,
            info : {
                ...registerForm.info,
                doctorLicense : e.target.value,
            },
        });
    };

    const onSetHospitalNm = (e : React.ChangeEvent<HTMLInputElement>) => {
        setHospitalNm(e.target.value);
    };

    const onSetContact = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({
            ...registerForm,
            info : {
                ...registerForm.info,
                contact : e.target.value,
            },
        });
    };

    const onSetDoctorType = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({
            ...registerForm,
            info : {
                ...registerForm.info,
                doctorType : e.target.value,
            },
        });
    };

    const onSetDoctorNm = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({
            ...registerForm,
            info : {
                ...registerForm.info,
                doctorNm : e.target.value,
            },
        });
    };

    const onSearchHospital = async () => {
        try {
            setLoading(true);
            setSearchHospital(true);
            const result = await authApi.searchHospital(hospitalNm, hospitalSearchPage);
            if(result.statusText === 'OK') {
                setLoading(false);
                setHospitalSearchPageList(new Array(result.data.totalPage).fill(null).map((item : null, index : number) => index + 1));
                setHospitalList(result.data.hospitalList.length ? result.data.hospitalList : [result.data.hospitalList]);
            }
        } catch(e : any) {
            setLoading(false);
            Alert.onError('알 수 없는 에러로 검색에 실패했습니다.', () => null);
        }
    };

    const onSetSearchPrevPage = () => {
        //set Prev Page
        const pageSlice = 5;
        if(hospitalSearchPage > pageSlice) {
            setHospitalSearchPage(Math.floor((hospitalSearchPage - 1) / pageSlice) * pageSlice);
        }
    };

    const onSetSearchNextPage = () => {
        //set Next Page
        const pageSlice = 5;
        if(hospitalSearchPage <= Math.floor((hospitalSearchPageList.length - 1) / pageSlice) * pageSlice) {
            setHospitalSearchPage(Math.ceil(hospitalSearchPage / pageSlice) * pageSlice + 1);
        }
    };

    const onConfirmSelectHospital = () => {
        setSearchHospital(false);
        setHospitalSearchPage(1);
        setHospitalSearchPageList([1]);
        setHospitalList([]);
    };
    
    const onCancelSelectHospital = () => {
        Alert.onCheck('병원 등록이 취소됩니다. 계속하시겠습니까?', () => {
            setSearchHospital(false);
            setHospitalNm('');
            setHospitalSearchPage(1);
            setHospitalSearchPageList([1]);
            setHospitalList([]);
            setSelectHospital(null);
        }, () => null);
    };

    const onSubmitButton = () => {
        if(error) {
            Alert.onError(error, () => null);
            return;
        }

        if(page === 1) {
            setPage(2);
        } else if(page === 2) {
            setPage(3);
        } else if(page === 3) {
            const onRegisterDoctor = async () => {
                try {
                    const result = await authApi.registerDoctor(registerForm);
                    if(result.data === 'Created') {
                        Alert.onSuccess('회원가입 성공, 관리자의 승인을 대기하세요.', () => props.history.push('/login'));
                    }
                } catch(e : any) {
                    Alert.onError(e.response.data.error, () => null);
                }
            };

            if(selectHospital) {
                Alert.onCheck('입력하신 정보로 회원가입을 진행하시겠습니까?', onRegisterDoctor, () => null);
            } else {
                Alert.onError('검색 버튼을 눌러 병원을 선택해주세요.', () => null);
            }

        }

    };



    useEffect(() => {
        validateRegisterForm();
    }, [registerForm, page]);

    useEffect(() => {
        if(selectHospital) {
            setHospitalNm(selectHospital.yadmNm);
            setRegisterForm({
                ...registerForm,
                info : {
                    ...registerForm.info,
                    hospitalNm : selectHospital.yadmNm,
                    hospitalAddr : selectHospital.addr,
                },
            });
        } else {
            setHospitalNm('');
            setRegisterForm({
                ...registerForm,
                info : {
                    ...registerForm.info,
                    hospitalNm : '',
                    hospitalAddr : '',
                },
            });
        }
    }, [selectHospital]);

    useEffect(() => {
        if(searchHospital) onSearchHospital();
    }, [hospitalSearchPage]);

    useEffect(() => {
        fetchData();
        validateRegisterForm();
    }, []);


    return (
        <>
        <Header {...props}/>
        <RegisterPresenter
            registerForm = {registerForm}
            page = {page}
            error = {error}

            onGoBackPage = {onGoBackPage}
            onCancleRegister = {onCancleRegister}

            onSetUserId = {onSetUserId}
            onSetPassword = {onSetPassword}
            onSetPasswordCheck = {onSetPasswordCheck}
            onSetDoctorLicense = {onSetDoctorLicense}
            hospitalNm = {hospitalNm}
            onSetHospitalNm = {onSetHospitalNm}
            onSetContact = {onSetContact}
            onSetDoctorType = {onSetDoctorType}
            onSetDoctorNm = {onSetDoctorNm}
            onSubmitButton = {onSubmitButton}

            searchHospital = {searchHospital}
            setSearchHospital = {setSearchHospital}
            onSearchHospital = {onSearchHospital}
            hospitalSearchPage = {hospitalSearchPage}
            setHospitalSearchPage = {setHospitalSearchPage}
            hospitalSearchPageList = {hospitalSearchPageList}
            onSetSearchPrevPage = {onSetSearchPrevPage}
            onSetSearchNextPage = {onSetSearchNextPage}

            onConfirmSelectHospital = {onConfirmSelectHospital}
            onCancelSelectHospital = {onCancelSelectHospital}

            hospitalList = {hospitalList}
            selectHospital = {selectHospital}
            setSelectHospital = {setSelectHospital}
        />
        </>
    )
};

export default RegisterContainer;