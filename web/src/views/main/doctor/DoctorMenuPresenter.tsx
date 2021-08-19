import React from 'react';

import * as styled from './DoctorMenuStyled';

const medicineImg = '/static/img/medicine.png';
const lensImg = '/static/img/lens.png';
const closeButton = '/static/img/close.png';


interface DoctorMenuProps {
    info : {
        infoType : string;
        userNm : string;
        doctorType : string | null;
        contact : string;
        userAge : number | null;
        patientInfo : string;
    };
    searchPatientKeyword : string;
    onSetKeyword : React.ChangeEventHandler<HTMLInputElement>;
    filteringPatientList : any[];
    patientDetail : any;
    onFetchPatientDetail : (arg0 : string) => void;

    onInitialize : () => void;
    onGoBottleDetail : (arg0 : number) => void;

    editModal : boolean;
    setEditModal : any;

    newPatientRegisterModal : boolean;
    setNewPatientRegisterModal : any;
    newPatientSearchId: string;
    onSetNewPatientSearchId : React.ChangeEventHandler<HTMLInputElement>;
    onSearchNewPatientByEmail : () => void;
}

const DoctorMenuPresenter = (props : DoctorMenuProps) => {
    return (
        <styled.Container>
            {
                props.editModal ? 
                <styled.ModalContainer>
                    <styled.ModalClsButtonWrapper>
                        <styled.ModalClsButton
                            onClick = {() => props.setEditModal(false)}
                        >
                            <styled.ModalClsButtonImg src = {closeButton}/>
                            <styled.ModalClsButtonText>닫기</styled.ModalClsButtonText>
                        </styled.ModalClsButton>
                    </styled.ModalClsButtonWrapper>
                    <styled.ModalContentWrapper>
                        <styled.ModalContent>
                            <styled.NewPatientRegisterTitle>새 환자 등록</styled.NewPatientRegisterTitle>
                            <styled.NewPatientSearchWrapper>
                                <styled.NewPatientSearchInput 
                                    placeholder = '환자 이메일을 입력하세요.'
                                    value = {props.newPatientSearchId}
                                    onChange = {props.onSetNewPatientSearchId}
                                />
                                <styled.NewPatientSearchButton
                                    onClick = {props.onSearchNewPatientByEmail}
                                >
                                    <styled.NewPatientSearchButtonImg src = {lensImg}/>
                                </styled.NewPatientSearchButton>
                            </styled.NewPatientSearchWrapper>
                            <styled.NewPatientSearchResultWrapper>
                                🤔검색 결과가 없습니다.
                            </styled.NewPatientSearchResultWrapper>
                            <styled.NewPatientRegisterButtonWrapper>
                                <styled.NewPatientRegisterButton>
                                    확인
                                </styled.NewPatientRegisterButton>
                                <styled.NewPatientRegisterButton>
                                    취소
                                </styled.NewPatientRegisterButton>
                            </styled.NewPatientRegisterButtonWrapper>
                        </styled.ModalContent>
                    </styled.ModalContentWrapper>
                    <styled.ModalClsButtonWrapper/>
                </styled.ModalContainer> : null
            }
            <styled.InfoAndSearchWrapper>
                <styled.InfoWrapper>
                    {
                        props.info.infoType === 'DOCTOR' ?
                        <styled.InfoSquare>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>분야</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.doctorType}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>이름</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.userNm}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>연락처</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.contact}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                        </styled.InfoSquare> :
                        <styled.InfoSquare>
                            <styled.EditPatientInfoButton>
                                <styled.EditPatientInfoButtonImg />
                                <styled.EditPatientInfoButtonText>수정</styled.EditPatientInfoButtonText>
                            </styled.EditPatientInfoButton>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>이름</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.userNm}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>생년월일</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.userAge}세</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>연락처</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.contact}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                            <styled.InfoEachWrapper
                                style = {{margin : '10px 0 0 0'}}
                            >
                                <styled.InfoEachTopic>환자 기록</styled.InfoEachTopic>
                                <styled.PatientInfo>
                                {
                                    props.info.patientInfo.split('\n\n').map((patientInfoText : string) => {
                                        return (
                                            <div key = {patientInfoText}>
                                            {patientInfoText}<br/><br/>
                                            </div>
                                        )
                                    })
                                }
                                </styled.PatientInfo>
                            </styled.InfoEachWrapper>
                        </styled.InfoSquare>
                    }
                    <styled.NewPatientButton 
                        onClick = {() => props.setEditModal(true)}
                    >
                        새 환자 등록
                    </styled.NewPatientButton>
                </styled.InfoWrapper>
                <styled.SearchAndDetailWrapper>
                    <styled.SearchBarWrapper>
                        <styled.SearchBar 
                            placeholder = '환자 정보(이름, 이메일, 휴대폰 번호)'
                            value = {props.searchPatientKeyword}
                            onChange = {props.onSetKeyword}
                        />
                        <styled.SearchButton>
                            검색
                        </styled.SearchButton>
                        <styled.SearchButton
                            onClick = {props.onInitialize}
                        >
                            초기화
                        </styled.SearchButton>
                    </styled.SearchBarWrapper>
                    <styled.SearchResultWrapper>
                        <styled.SearchResultInfo>
                            <styled.SearchResultInfoEach isLast = {false}>이름</styled.SearchResultInfoEach>
                            <styled.SearchResultInfoEach isLast = {false}>생년월일</styled.SearchResultInfoEach>
                            <styled.SearchResultInfoEach isLast = {true}>연락처</styled.SearchResultInfoEach>
                        </styled.SearchResultInfo>
                        {
                            props.filteringPatientList.length ?
                            props.filteringPatientList.map(patient => {
                                return (
                                    <styled.SearchResultEach 
                                        key = {patient._id}
                                        onClick = {() => props.onFetchPatientDetail(patient.userId)}
                                    >
                                        <styled.SearchResultEachText isLast = {false}>{patient.userNm}</styled.SearchResultEachText>
                                        <styled.SearchResultEachText isLast = {false}>{patient.userAge}세</styled.SearchResultEachText>
                                        <styled.SearchResultEachText isLast = {true}>{patient.contact}</styled.SearchResultEachText>
                                    </styled.SearchResultEach>
                                )
                            }) :
                            <styled.NothingWrapper>
                                🤔검색 결과가 없습니다.
                            </styled.NothingWrapper>
                        }
                    </styled.SearchResultWrapper>
                </styled.SearchAndDetailWrapper>
            </styled.InfoAndSearchWrapper>
            <styled.BottleListWrapper>
            {
                props.patientDetail && props.patientDetail.bottleList ?
                props.patientDetail.bottleList.map((bottle : any) => {
                    return (
                        <styled.EachBottleWrapper
                            key = {bottle.bottleId}
                            onClick = {() => props.onGoBottleDetail(bottle.bottleId)}
                        >
                            <styled.EachBottleImg src = {medicineImg}/>
                            <styled.EachBottleInfo>{bottle.medicine.name.slice(0, 14)}</styled.EachBottleInfo>
                            <styled.EachBottleInfo>{`등록일 : ${bottle.regDtm.slice(0, 10)}`}</styled.EachBottleInfo>
                        </styled.EachBottleWrapper>
                    )
                }) :
                <styled.NothingWrapper>
                    🤔먼저 환자를 선택하세요.
                </styled.NothingWrapper>
            }
            </styled.BottleListWrapper>
        </styled.Container>
    )
};

export default DoctorMenuPresenter;