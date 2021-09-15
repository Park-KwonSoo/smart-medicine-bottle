import React from 'react';

import * as styled from './DoctorMenuStyled';

const medicineImg = '/static/img/medicine.png';
const addButton = '/static/img/plus.png';
const lensImg = '/static/img/lens.png';
const closeButton = '/static/img/close.png';
const edit = '/static/img/edit.png';
const refreshing = '/static/img/refreshing.png';
const check = '/static/img/check.png';
const uncheck = '/static/img/uncheck.png'


interface DoctorMenuProps {
    info : {
        infoType : string;
        userNm : string;
        doctorType : string | null;
        contact : string;
        birth : number | null;
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
    editPatientInfo : string;
    onEditPatientInfo : React.ChangeEventHandler<HTMLTextAreaElement>;
    onSubmitPatientInfo : () => void;

    newPatientRegisterModal : boolean;
    setNewPatientRegisterModal : any;
    newPatientSearchId: string;
    onSetNewPatientSearchId : React.ChangeEventHandler<HTMLInputElement>;
    onSearchNewPatientByEmail : () => void;
    onRegisterNewPatient : () => void;
    onCloseModal : () => void;

    newPatientSearchResult : any;

    prescribeModal : boolean;
    setPrescribeModal : any;
    searchMedicineKeyword : string;
    onSetSearchMedicineKeyword : React.ChangeEventHandler<HTMLInputElement>;

    medicineList : any;
    searchMedicine : () => void;

    prescribeMedicine : any;
    setPrescribeMedicine : (arg0 : any) => void;

    onPrescribeSubmit : () => void;
    onPrescribeCancel : () => void;
}

const DoctorMenuPresenter = (props : DoctorMenuProps) => {
    return (
        <styled.Container>
            {
                props.newPatientRegisterModal ? 
                <styled.ModalContainer>
                    <styled.ModalClsButtonWrapper>
                        <styled.ModalClsButton
                            onClick = {() => props.setNewPatientRegisterModal(false)}
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
                                {
                                    props.newPatientSearchResult ?
                                    <styled.NewPatientSearchResult>
                                        <styled.NewPatientSearchResultInfoWrapper>
                                            <styled.NewPatientSearchResultInfo>이름 : </styled.NewPatientSearchResultInfo>
                                            <styled.NewPatientSearchResultInfoText>
                                                {props.newPatientSearchResult.patientNm}
                                            </styled.NewPatientSearchResultInfoText>
                                        </styled.NewPatientSearchResultInfoWrapper>
                                    </styled.NewPatientSearchResult> :
                                    '🤔검색 결과가 없습니다.'
                                }
                            </styled.NewPatientSearchResultWrapper>
                            <styled.NewPatientRegisterButtonWrapper>
                                <styled.NewPatientRegisterButton
                                    onClick = {props.onRegisterNewPatient}
                                >
                                    확인
                                </styled.NewPatientRegisterButton>
                                <styled.NewPatientRegisterButton
                                    onClick = {props.onCloseModal}
                                >
                                    취소
                                </styled.NewPatientRegisterButton>
                            </styled.NewPatientRegisterButtonWrapper>
                        </styled.ModalContent>
                    </styled.ModalContentWrapper>
                    <styled.ModalClsButtonWrapper/>
                </styled.ModalContainer> : null
            }
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
                            <styled.PatientInfoViewContainer>
                                <styled.PatientInfoPatientNmWrapper>
                                    <styled.PatientInfoPatientNmInfo>이름 : </styled.PatientInfoPatientNmInfo>
                                    <styled.PatientInfoPatientNm>{props.info.userNm}</styled.PatientInfoPatientNm>
                                </styled.PatientInfoPatientNmWrapper>
                                <styled.PatientInfoView>
                                
                                {
                                    props.info.patientInfo.split('\n\n').map((patientInfoText : string) => {
                                        return (
                                            <div key = {patientInfoText}>
                                            {patientInfoText}<br/><br/>
                                            </div>
                                        )
                                    })
                                }
                                </styled.PatientInfoView>
                            </styled.PatientInfoViewContainer>
                            <styled.PatientInfoEditWrapper>
                                <styled.PatientInfoEditInput
                                    value = {props.editPatientInfo}
                                    onChange = {props.onEditPatientInfo}
                                />
                            </styled.PatientInfoEditWrapper>
                            <styled.PatientInfoEditButtonWrapper>
                                <styled.PatientInfoEditButton
                                    onClick = {props.onSubmitPatientInfo}
                                >
                                    확인
                                </styled.PatientInfoEditButton>
                                <styled.PatientInfoEditButton
                                    onClick = {props.onCloseModal}
                                >
                                    취소
                                </styled.PatientInfoEditButton>
                            </styled.PatientInfoEditButtonWrapper>
                        </styled.ModalContent>
                    </styled.ModalContentWrapper>
                    <styled.ModalClsButtonWrapper/>
                </styled.ModalContainer> : null
            }
            {
                props.prescribeModal ? 
                <styled.ModalContainer>
                    <styled.ModalClsButtonWrapper>
                        <styled.ModalClsButton
                            onClick = {props.onCloseModal}
                        >
                            <styled.ModalClsButtonImg src = {closeButton}/>
                            <styled.ModalClsButtonText>닫기</styled.ModalClsButtonText>
                        </styled.ModalClsButton>
                    </styled.ModalClsButtonWrapper>
                    <styled.ModalContentWrapper>
                        <styled.ModalContent>
                            <styled.MedicineSearchTitle>
                                약 검색
                            </styled.MedicineSearchTitle>
                            <styled.MedicineSearchInputWrapper>
                                <styled.MedicineSearchInput 
                                    placeholder = '증상, 또는 약 이름을 검색하세요.'
                                    onChange = {props.onSetSearchMedicineKeyword}
                                    value = {props.searchMedicineKeyword}
                                />
                                <styled.MedicineSearchButton
                                    onClick = {props.searchMedicine}
                                >
                                    <styled.MedicineSearchButtonImg src = {lensImg}/>
                                </styled.MedicineSearchButton>
                            </styled.MedicineSearchInputWrapper>
                            <styled.MedicineSearchResultWrapper>
                            {
                                props.medicineList.length ?
                                props.medicineList.map((medicine : any) => {
                                    return (
                                        <styled.MedicineSearchResultEach
                                            key = {medicine.medicineId}
                                            onClick = {() => props.setPrescribeMedicine(medicine)}
                                        >
                                            <styled.MedicineSearchResultEachInfo>
                                                {medicine.name}
                                            </styled.MedicineSearchResultEachInfo>
                                            <styled.MedicineSearchButtonImg 
                                                src = {
                                                    props.prescribeMedicine && props.prescribeMedicine.medicineId === medicine.medicineId ?
                                                    check : uncheck
                                                }
                                            />
                                        </styled.MedicineSearchResultEach>
                                    )
                                }) :
                                <styled.NothingWrapper style = {{fontSize : 13,}}>
                                    🤔검색 결과가 없습니다.
                                </styled.NothingWrapper>
                            }
                            </styled.MedicineSearchResultWrapper>
                            <styled.MedicinePrescribeButtonWrapper>
                                <styled.MedicinePrescribeButton
                                    isClose = {false}
                                    onClick = {props.onPrescribeSubmit}
                                >
                                    처방
                                </styled.MedicinePrescribeButton>
                                <styled.MedicinePrescribeButton
                                    isClose = {true}
                                    onClick = {props.onPrescribeCancel}
                                >
                                    취소
                                </styled.MedicinePrescribeButton>
                            </styled.MedicinePrescribeButtonWrapper>
                        </styled.ModalContent>
                    </styled.ModalContentWrapper>
                    <styled.ModalClsButtonWrapper/>
                </styled.ModalContainer> : null
            }
            <styled.InfoAndSearchWrapper>
                <styled.InfoWrapper>
                    {
                        props.info.infoType === 'DOCTOR' ?
                        <>
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
                        </styled.InfoSquare>
                        <styled.NewPatientButton
                            disabled = {true}
                        >
                            내 정보
                        </styled.NewPatientButton>
                        </> :
                        <>
                        <styled.InfoSquare>
                            <styled.EditPatientInfoButton
                                onClick = {() => props.setEditModal(true)}
                            >
                                <styled.EditPatientInfoButtonImg src = {edit}/>
                                <styled.EditPatientInfoButtonText>특이사항</styled.EditPatientInfoButtonText>
                            </styled.EditPatientInfoButton>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>이름</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.userNm}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>생년월일</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.birth}</styled.InfoEachText>
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
                        <styled.NewPatientButton 
                            onClick = {() => props.setPrescribeModal(true)}
                        >
                            처방 하기
                        </styled.NewPatientButton>
                        </>
                    }
                </styled.InfoWrapper>
                <styled.SearchAndDetailWrapper>
                    <styled.SearchBarWrapper>
                        <styled.SearchBar 
                            placeholder = '환자 정보(이름, 이메일, 휴대폰 번호)'
                            value = {props.searchPatientKeyword}
                            onChange = {props.onSetKeyword}
                        />
                        <styled.SearchButton
                            onClick = {() => props.setNewPatientRegisterModal(true)}
                        >
                            <styled.SearchButtonImg src = {addButton}/>
                        </styled.SearchButton>
                        <styled.SearchButton
                            onClick = {props.onInitialize}
                        >
                            <styled.SearchButtonImg src = {refreshing}/>
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
                                        <styled.SearchResultEachText isLast = {false}>{patient.birth}</styled.SearchResultEachText>
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
                props.patientDetail && props.patientDetail.bottleList.length ?
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
                props.patientDetail && !props.patientDetail.bottleList.length ?
                <styled.NothingWrapper>
                    🤔관리하고 있는 환자의 약병이 없습니다.
                </styled.NothingWrapper>
                :
                <styled.NothingWrapper>
                    🤔먼저 환자를 선택하세요.
                </styled.NothingWrapper>
            }
            </styled.BottleListWrapper>
        </styled.Container>
    )
};

export default DoctorMenuPresenter;