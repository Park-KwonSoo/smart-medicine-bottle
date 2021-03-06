import React from 'react';

import Modal from '../../../components/Modal';

import * as styled from './DoctorMenuStyled';

const medicineImg = '/static/img/medicine.png';
const addButton = '/static/img/plus.png';
const lensImg = '/static/img/lens.png';
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
    newPatientSearchContact: string;
    onSetNewPatientSearchContact : React.ChangeEventHandler<HTMLInputElement>;
    onSearchNewPatientByContact : () => void;
    onRegisterNewPatient : () => void;
    onCloseModal : () => void;

    newPatientSearchResult : any;

    prescribeModal : boolean;
    setPrescribeModal : any;
    prescribeModalStep : number;
    onSetNextStepPrescribe : () => void;
    onSetPrevStepPrescribe : () => void;

    searchMedicineKeyword : string;
    onSetSearchMedicineKeyword : React.ChangeEventHandler<HTMLInputElement>;

    medicineList : any;
    searchMedicine : () => void;

    prescribeMedicine : any;
    setPrescribeMedicine : (arg0 : any) => void;

    dailyDosage : string;
    onSetDailyDosage : React.ChangeEventHandler<HTMLInputElement>;
    totalDay : string;
    onSetTotalDay : React.ChangeEventHandler<HTMLInputElement>;

    qrcodeUrl : string | null;

    onPrescribeSubmit : () => void;
    onPrintQrcode : (arg0 : string) => void;
    onPrescribeCancel : () => void;
}

const DoctorMenuPresenter = (props : DoctorMenuProps) => {
    return (
        <styled.Container>
            {
                props.newPatientRegisterModal ?
                <Modal onModalClose = {() => props.setNewPatientRegisterModal(false)}>
                    <>
                    <styled.NewPatientRegisterTitle>??? ?????? ??????</styled.NewPatientRegisterTitle>
                    <styled.NewPatientSearchWrapper>
                        <styled.NewPatientSearchInput 
                            placeholder = '????????? ???????????? ???????????????.'
                            value = {props.newPatientSearchContact}
                            onChange = {props.onSetNewPatientSearchContact}
                        />
                        <styled.NewPatientSearchButton
                            onClick = {props.onSearchNewPatientByContact}
                        >
                            <styled.NewPatientSearchButtonImg src = {lensImg}/>
                        </styled.NewPatientSearchButton>
                    </styled.NewPatientSearchWrapper>
                    <styled.NewPatientSearchResultWrapper>
                        {
                            props.newPatientSearchResult ?
                            <styled.NewPatientSearchResult>
                                <styled.NewPatientSearchResultInfoWrapper>
                                    <styled.NewPatientSearchResultInfo>
                                        ?????? : 
                                        <styled.NewPatientSearchResultInfoText>
                                            {props.newPatientSearchResult.userNm}
                                        </styled.NewPatientSearchResultInfoText>
                                    </styled.NewPatientSearchResultInfo>    
                                    <styled.NewPatientSearchResultInfo>
                                        ???????????? : 
                                        <styled.NewPatientSearchResultInfoText>
                                            {props.newPatientSearchResult.birth}
                                        </styled.NewPatientSearchResultInfoText>
                                    </styled.NewPatientSearchResultInfo>
                                </styled.NewPatientSearchResultInfoWrapper>
                            </styled.NewPatientSearchResult> :
                            '?????????? ????????? ????????????.'
                        }
                    </styled.NewPatientSearchResultWrapper>
                    <styled.NewPatientRegisterButtonWrapper>
                        <styled.NewPatientRegisterButton
                            onClick = {props.onRegisterNewPatient}
                        >
                            ??????
                        </styled.NewPatientRegisterButton>
                        <styled.NewPatientRegisterButton
                            onClick = {props.onCloseModal}
                        >
                            ??????
                        </styled.NewPatientRegisterButton>
                    </styled.NewPatientRegisterButtonWrapper>
                    </>
                </Modal> : null
            }
            {
                props.editModal ?
                <Modal onModalClose = {() => props.setEditModal(false)}>
                    <>
                    <styled.PatientInfoViewContainer>
                        <styled.PatientInfoPatientNmWrapper>
                            <styled.PatientInfoPatientNmInfo>?????? : </styled.PatientInfoPatientNmInfo>
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
                            ??????
                        </styled.PatientInfoEditButton>
                        <styled.PatientInfoEditButton
                            onClick = {props.onCloseModal}
                        >
                            ??????
                        </styled.PatientInfoEditButton>
                    </styled.PatientInfoEditButtonWrapper>
                    </>
                </Modal> : null
            }
            {
                props.prescribeModal ? 
                <Modal onModalClose = {props.onCloseModal}>
                    <>
                    <styled.MedicineSearchTitle>
                    {
                        props.prescribeModalStep === 1 ?
                        '??? ??????' :
                        props.prescribeModalStep === 2 ?
                        '????????? ??????' :
                        '?????? ?????? QR??????'
                    }
                    </styled.MedicineSearchTitle>
                    {
                        props.prescribeModalStep === 1 ?
                        <>
                        <styled.MedicineSearchInputWrapper>
                            <styled.MedicineSearchInput 
                                placeholder = '??????, ?????? ??? ????????? ???????????????.'
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
                                        onClick = {() => props.setPrescribeMedicine(
                                            props.prescribeMedicine && props.prescribeMedicine.medicineId === medicine.medicineId ? 
                                            null : medicine
                                        )}
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
                                ?????????? ????????? ????????????.
                            </styled.NothingWrapper>
                        }
                        </styled.MedicineSearchResultWrapper>
                        </>
                        :
                        props.prescribeModalStep === 2 ?
                        <styled.MedicineDosageSetWrapper>
                            <styled.MedicineDosageInfo>
                                *?????? ???????????? ???????????????.
                            </styled.MedicineDosageInfo>
                            <styled.MedicineDosageInput
                                value = {props.dailyDosage}
                                onChange = {props.onSetDailyDosage}
                                min = {1}
                                max = {3}
                            />
                            <styled.MedicineDosageInfo>
                                *??? ?????? ???????????? ???????????????.
                            </styled.MedicineDosageInfo>
                            <styled.MedicineDosageInput
                                value = {props.totalDay}
                                onChange = {props.onSetTotalDay}
                            />
                        </styled.MedicineDosageSetWrapper>
                        :
                        <styled.MedicineQRCodeWrapper
                            id = 'qrCodePrint'
                        >
                            <styled.MedicineQRCodeInfo>
                                *???????????????????????? QR????????? ???????????? ????????? ?????? ???????????????.
                            </styled.MedicineQRCodeInfo>
                            {
                                props.qrcodeUrl ?
                                <styled.MedicineQRCode 
                                    src = {props.qrcodeUrl}/> : null
                            }
                        </styled.MedicineQRCodeWrapper>
                    }
                    <styled.MedicinePrescribeButtonWrapper>
                        {
                            props.prescribeModalStep === 1 ?
                            <styled.MedicinePrescribeButton
                                isClose = {false}
                                onClick = {props.onSetNextStepPrescribe}
                            >
                                ?????? ??????
                            </styled.MedicinePrescribeButton> :
                            props.prescribeModalStep === 2 ?
                            <styled.MedicinePrescribeButton
                                isClose = {false}
                                onClick = {props.onPrescribeSubmit}
                            >
                                ??????
                            </styled.MedicinePrescribeButton> 
                            :
                            <styled.MedicinePrescribeButton
                                isClose = {false}
                                onClick = {() => props.onPrintQrcode('qrCodePrint')}
                            >
                                ??????
                            </styled.MedicinePrescribeButton>
                        }
                        <styled.MedicinePrescribeButton
                            isClose = {true}
                            onClick = {props.onPrescribeCancel}
                        >
                            ??????
                        </styled.MedicinePrescribeButton>
                    </styled.MedicinePrescribeButtonWrapper>
                    </>
                </Modal> : null
            }
            <styled.InfoAndSearchWrapper>
                <styled.InfoWrapper>
                    {
                        props.info.infoType === 'DOCTOR' ?
                        <>
                        <styled.InfoSquare>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>??????</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.doctorType}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>??????</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.userNm}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>?????????</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.contact}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                        </styled.InfoSquare>
                        <styled.NewPatientButton
                            disabled = {true}
                        >
                            ??? ??????
                        </styled.NewPatientButton>
                        </> :
                        <>
                        <styled.InfoSquare>
                            <styled.EditPatientInfoButton
                                onClick = {() => props.setEditModal(true)}
                            >
                                <styled.EditPatientInfoButtonImg src = {edit}/>
                                <styled.EditPatientInfoButtonText>????????????</styled.EditPatientInfoButtonText>
                            </styled.EditPatientInfoButton>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>??????</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.userNm}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>????????????</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.birth}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                            <styled.InfoEachWrapper>
                                <styled.InfoEachTopic>?????????</styled.InfoEachTopic>
                                <styled.InfoEachText>{props.info.contact}</styled.InfoEachText>
                            </styled.InfoEachWrapper>
                            <styled.InfoEachWrapper
                                style = {{margin : '10px 0 0 0'}}
                            >
                                <styled.InfoEachTopic>?????? ??????</styled.InfoEachTopic>
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
                            ?????? ??????
                        </styled.NewPatientButton>
                        </>
                    }
                </styled.InfoWrapper>
                <styled.SearchAndDetailWrapper>
                    <styled.SearchBarWrapper>
                        <styled.SearchBar 
                            placeholder = '?????? ??????(??????, ?????????, ????????? ??????)'
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
                            <styled.SearchResultInfoEach isLast = {false}>??????</styled.SearchResultInfoEach>
                            <styled.SearchResultInfoEach isLast = {false}>????????????</styled.SearchResultInfoEach>
                            <styled.SearchResultInfoEach isLast = {true}>?????????</styled.SearchResultInfoEach>
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
                                ?????????? ????????? ????????????.
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
                            <styled.EachBottleInfo>{`????????? : ${bottle.regDtm.slice(0, 10)}`}</styled.EachBottleInfo>
                        </styled.EachBottleWrapper>
                    )
                }) :
                props.patientDetail && !props.patientDetail.bottleList.length ?
                <styled.NothingWrapper>
                    ???????????????? ?????? ????????? ????????? ????????????.
                </styled.NothingWrapper>
                :
                <styled.NothingWrapper>
                    ?????????? ????????? ???????????????.
                </styled.NothingWrapper>
            }
            </styled.BottleListWrapper>
        </styled.Container>
    )
};

export default DoctorMenuPresenter;