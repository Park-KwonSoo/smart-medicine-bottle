import React from 'react';

import Modal from '../../components/Modal';
import * as styled from './RegisterStyled';


const lensImg = '/static/img/lens.png';
const check = '/static/img/check.png';
const uncheck = '/static/img/uncheck.png'
const next = '/static/img/next.png';
const prev = '/static/img/prev.png';


interface RegisterProps {
    registerForm : {
        userId : string;
        password : string;
        passwordCheck : string;
        info : {
            hospitalNm : string;
            hospitalAddr : string;
            contact : string;
            doctorType : string;
            doctorNm : string;
        },
    };
    doctorInfoFile : FileList | null;
    doctorInfoFile_Select : any;
    page : number;
    error : string | null;

    onGoBackPage : () => void;
    onCancleRegister : () => void;
    
    onSetUserId : React.ChangeEventHandler<HTMLInputElement>;
    onSetPassword : React.ChangeEventHandler<HTMLInputElement>;
    onSetPasswordCheck : React.ChangeEventHandler<HTMLInputElement>;
    onSetDoctorLicense : React.ChangeEventHandler<HTMLInputElement>;
    hospitalNm : string;
    onSetHospitalNm : React.ChangeEventHandler<HTMLInputElement>;
    onSetContact : React.ChangeEventHandler<HTMLInputElement>;
    onSetDoctorType : React.ChangeEventHandler<HTMLInputElement>;
    onSetDoctorNm : React.ChangeEventHandler<HTMLInputElement>;
    onSubmitButton : () => void;

    searchHospital : boolean;
    setSearchHospital : (arg0 : boolean) => void;
    onSearchHospital : () => void;

    hospitalSearchPage : number;
    setHospitalSearchPage : (arg0 : number) => void;
    hospitalSearchPageList : number[];
    onSetSearchPrevPage : () => void;
    onSetSearchNextPage : () => void;

    onConfirmSelectHospital : () => void;
    onCancelSelectHospital : () => void;

    hospitalList : any[];
    selectHospital : any;
    setSelectHospital : (arg0 : any) => void;
}

const RegisterPresenter = (props : RegisterProps) => {
    return (
        <styled.Container>
            {
                props.searchHospital ?
                <Modal onModalClose = {props.onCancelSelectHospital}>
                    <>
                    <styled.SearchTitle>
                        {`[${props.hospitalNm}] 에 대한 검색 결과 : `}
                        <styled.SearchResultCount style = {{marginLeft : 5, marginRight : 5,}}>총 </styled.SearchResultCount>
                        {props.hospitalSearchPageList.length}
                        <styled.SearchResultCount>페이지</styled.SearchResultCount>
                    </styled.SearchTitle>
                    <styled.HospitalListWrapper>
                        <styled.HospitalListInfo>
                            <styled.HospitalListInfoEach isLast = {false}>이름</styled.HospitalListInfoEach>
                            <styled.HospitalListInfoEach isLast = {false}>주소</styled.HospitalListInfoEach>
                            <styled.HospitalListInfoEach isLast = {true}>선택</styled.HospitalListInfoEach>
                        </styled.HospitalListInfo>
                        {
                            props.hospitalList.map((hospital : any) => {
                                return (
                                    <styled.HospitalListEach
                                        key = {hospital.addr}
                                    >
                                        <styled.HospitalListEachInfo isLast = {false}>
                                            {hospital.yadmNm}
                                        </styled.HospitalListEachInfo>
                                        <styled.HospitalListEachInfo isLast = {false}>
                                            {hospital.addr}
                                        </styled.HospitalListEachInfo>
                                        <styled.HospitalListEachInfo isLast = {true}>
                                            <styled.CheckButton
                                                onClick = {() => props.setSelectHospital(hospital)}
                                            >
                                                <styled.CheckButtonImg src = {
                                                    props.selectHospital && props.selectHospital.addr === hospital.addr ?
                                                    check : uncheck
                                                }/>
                                            </styled.CheckButton>
                                        </styled.HospitalListEachInfo>
                                    </styled.HospitalListEach>
                                )
                            })
                        }
                    </styled.HospitalListWrapper>
                    <styled.PageWrapper>
                        <styled.PageButton
                            isSelect = {false}
                            onClick = {props.onSetSearchPrevPage}
                        >
                            <styled.PageArrowImg src = {prev}/>
                        </styled.PageButton>
                        {
                            props.hospitalSearchPageList.slice(Math.floor((props.hospitalSearchPage - 1) / 5) * 5, Math.floor((props.hospitalSearchPage - 1) / 5) * 5 + 5)
                            .map((page : number) => {
                                return (
                                    <styled.PageButton
                                        key = {page}
                                        isSelect = {props.hospitalSearchPage === page}
                                        onClick = {() => props.setHospitalSearchPage(page)}
                                    >
                                        {page}
                                    </styled.PageButton>
                                )
                            })
                        }
                        <styled.PageButton
                            isSelect = {false}
                            onClick = {props.onSetSearchNextPage}
                        >
                            <styled.PageArrowImg src = {next}/>
                        </styled.PageButton>
                    </styled.PageWrapper>
                    <styled.ModalButtonWrapper>
                        <styled.ModalButton
                            isCloseButton = {false}
                            onClick = {props.onConfirmSelectHospital}
                        >
                            확인
                        </styled.ModalButton>
                        <styled.ModalButton
                            isCloseButton = {true}
                            onClick = {props.onCancelSelectHospital}
                        >
                            취소
                        </styled.ModalButton>
                    </styled.ModalButtonWrapper>
                    </>
                </Modal> : null
            }
            <styled.RegisterWrapper>
                <styled.RegisterBackButtonWrapper>
                    <styled.RegisterBackButton
                        onClick = {props.onCancleRegister}
                    >
                        회원가입 취소
                    </styled.RegisterBackButton>
                    {
                        props.page > 1 ?
                        <styled.RegisterBackButton
                            onClick = {props.onGoBackPage}
                        >
                            이전
                        </styled.RegisterBackButton> : null
                    }
                </styled.RegisterBackButtonWrapper>
                <styled.RegisterTitle>회원 가입</styled.RegisterTitle>
                <styled.RegisterInfo>* 의사만 회원가입이 가능합니다.</styled.RegisterInfo>
                <styled.RegisterInfo style = {{fontSize : 10,}}>의사 인증을 위한 정보가 요구됩니다. 해당 정보는 인증을 위한 용도로만 사용됩니다.</styled.RegisterInfo>
                {
                    props.page === 1 ?
                    <>
                    <styled.RegisterInputWrapper>
                        <styled.RegisterInputText>이메일</styled.RegisterInputText>
                        <styled.RegisterInput 
                            placeholder = 'Email'
                            value = {props.registerForm.userId}
                            onChange = {props.onSetUserId}
                        />
                    </styled.RegisterInputWrapper>
                    <styled.RegisterInputWrapper>
                        <styled.RegisterInputText>비밀번호</styled.RegisterInputText>
                        <styled.RegisterInput 
                            placeholder = 'Password'
                            value = {props.registerForm.password}
                            onChange = {props.onSetPassword}
                            type = 'password'
                        />
                    </styled.RegisterInputWrapper>
                    <styled.RegisterInputWrapper>
                        <styled.RegisterInputText>비밀번호 확인</styled.RegisterInputText>
                        <styled.RegisterInput 
                            placeholder = 'Password Again'
                            value = {props.registerForm.passwordCheck}
                            onChange = {props.onSetPasswordCheck}
                            type = 'password'
                        />
                    </styled.RegisterInputWrapper>
                    </> :
                    props.page === 2 ?
                    <>
                    <styled.RegisterInputWrapper>
                        <styled.RegisterInputText>의사 자격증 번호</styled.RegisterInputText>
                        <input type = 'file'
                            style = {{ display : 'none' }}
                            onChange = {props.onSetDoctorLicense}
                            ref = {props.doctorInfoFile_Select}
                        />
                        <styled.RegisterFileUploadWrapper>
                            <styled.RegisterFileUploadButton onClick = {() => props.doctorInfoFile_Select.current.click()}>
                                파일 첨부
                            </styled.RegisterFileUploadButton>
                            <styled.RegisterFileUploadInfoText>
                                {props.doctorInfoFile ? props.doctorInfoFile[0].name : ''}
                            </styled.RegisterFileUploadInfoText>
                        </styled.RegisterFileUploadWrapper>
                    </styled.RegisterInputWrapper>
                    <styled.RegisterInputWrapper>
                        <styled.RegisterInputText>이름</styled.RegisterInputText>
                        <styled.RegisterInput 
                            placeholder = 'Name'
                            value = {props.registerForm.info.doctorNm}
                            onChange = {props.onSetDoctorNm}
                        />
                    </styled.RegisterInputWrapper>
                    <styled.RegisterInputWrapper>
                        <styled.RegisterInputText>연락처</styled.RegisterInputText>
                        <styled.RegisterInput 
                            placeholder = 'Contact'
                            value = {props.registerForm.info.contact}
                            onChange = {props.onSetContact}
                        />
                    </styled.RegisterInputWrapper>
                    </> :
                    props.page === 3 ?
                    <>
                    <styled.RegisterInputWrapper>
                        <styled.RegisterInputText>병원</styled.RegisterInputText>
                        <styled.RegisterInputWrapperForSearch>
                            <styled.RegisterInput 
                                placeholder = 'Hospital'
                                value = {props.hospitalNm}
                                onChange = {props.onSetHospitalNm}
                            />
                            <styled.RegisterInputSearchButton
                                onClick = {props.onSearchHospital}
                            >
                                <styled.RegisterInputSearchButtonImg src = {lensImg}/>
                            </styled.RegisterInputSearchButton>
                        </styled.RegisterInputWrapperForSearch>
                    </styled.RegisterInputWrapper>
                    <styled.RegisterInputWrapper>
                        <styled.RegisterInputText>주소</styled.RegisterInputText>
                        <styled.RegisterInput 
                            placeholder = 'Address'
                            value = {props.registerForm.info.hospitalAddr}
                        />
                    </styled.RegisterInputWrapper>
                    <styled.RegisterInputWrapper>
                        <styled.RegisterInputText>전문 분야</styled.RegisterInputText>
                        <styled.RegisterInput 
                            placeholder = "Doctor's Type"
                            value = {props.registerForm.info.doctorType}
                            onChange = {props.onSetDoctorType}
                        />
                    </styled.RegisterInputWrapper>
                    </> : null
                }
                <styled.RegisterButtonWrapper>
                    <styled.RegisterButton
                        onClick = {props.onSubmitButton}
                    >
                    {
                        props.page < 3 ? '다음' : '회원 가입'
                    }
                    </styled.RegisterButton>
                </styled.RegisterButtonWrapper>
            </styled.RegisterWrapper> 
        </styled.Container>
    )
};

export default RegisterPresenter;