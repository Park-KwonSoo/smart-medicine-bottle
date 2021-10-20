import React from 'react';

import Modal from '../../../components/Modal';
import  * as styled from './ManagerMenuStyled';


interface ManagerMenuProps {
    viewType : string;
    onViewRegList : () => void;
    onViewSecList : () => void;

    doctorList : any[];

    doctorDetail : any;
    modalUp : boolean;
    setModalUp : any;
    onViewDetailReq : (arg0 : string) => void;
    onViewLicenseDetail : (arg0 : string) => void;

    validate : string;
    onValidate : () => void;

    validateDoctorLicense : string;
    onSetValidateDoctorLicense : React.ChangeEventHandler<HTMLInputElement>;

    onAcceptRegReq : () => void;
    onAcceptSecReq : (arg0 : string) => void;
    onRejectRequest : () => void;

}

const ManagerMenuPresenter = (props : ManagerMenuProps) => {
    return (
        <styled.Container>
            {
                props.modalUp ? 
                <Modal onModalClose = {() => props.setModalUp(false)}>
                    <>
                    <styled.ModalTitleWrapper>
                        <styled.ModalTitle>가입 요청 정보</styled.ModalTitle>
                    </styled.ModalTitleWrapper>
                    <styled.ModalBodyWrapper>
                        <styled.ModalBodyLeftAndRight>
                            <styled.ModalInfoWrapper>
                                <styled.DoctorLicenseViewWrapper>
                                    <styled.ModalInfoExplain>
                                        의사 자격 번호
                                    </styled.ModalInfoExplain>
                                    <styled.DoctorLicenseViewButton onClick = {() => props.onViewLicenseDetail(props.doctorDetail.info.doctorLicense)}>
                                        자격정보 확인
                                    </styled.DoctorLicenseViewButton>
                                </styled.DoctorLicenseViewWrapper>
                                <styled.ModalInfoNotice>
                                    * 자격 정보 확인 버튼을 눌러 정보를 확인하세요. 
                                    <br/>* 정보 확인은 15분간 유효합니다.
                                    <br/>* 확인한 면허 번호를 입력 후 검증하세요.
                                </styled.ModalInfoNotice>
                                <styled.ModalInfo>
                                    <styled.DoctorLicenseViewInput
                                        placeholder = '의사 면허 번호'
                                        value = {props.validateDoctorLicense}
                                        onChange = {props.onSetValidateDoctorLicense}
                                    />
                                    <styled.ValidateButton
                                        onClick = {props.onValidate}
                                        disabled = {props.validate !== 'W'}
                                        validate = {props.validate} 
                                    >
                                        {
                                            props.validate === 'Y' ?
                                            '검증 완료' :
                                            props.validate === 'W' ?
                                            '검증' : 
                                            props.validate === 'N' ?
                                            '검증 실패' : null
                                        }
                                    </styled.ValidateButton>
                                </styled.ModalInfo>
                            </styled.ModalInfoWrapper>
                            <styled.ModalInfoWrapper>
                                <styled.ModalInfoExplain>이름</styled.ModalInfoExplain>
                                <styled.ModalInfo>{props.doctorDetail.info.doctorNm}</styled.ModalInfo>
                            </styled.ModalInfoWrapper>
                            <styled.ModalInfoWrapper>
                                <styled.ModalInfoExplain>연락처</styled.ModalInfoExplain>
                                <styled.ModalInfo>{props.doctorDetail.info.contact}</styled.ModalInfo>
                            </styled.ModalInfoWrapper>
                        </styled.ModalBodyLeftAndRight>
                        <styled.ModalBodyLeftAndRight>
                            <styled.ModalInfoWrapper>
                                <styled.ModalInfoExplain>전문 분야</styled.ModalInfoExplain>
                                <styled.ModalInfo>{props.doctorDetail.info.doctorType}</styled.ModalInfo>
                            </styled.ModalInfoWrapper>
                            <styled.ModalInfoWrapper>
                                <styled.ModalInfoExplain>병원명</styled.ModalInfoExplain>
                                <styled.ModalInfo>{props.doctorDetail.info.hospitalNm}</styled.ModalInfo>
                            </styled.ModalInfoWrapper>
                            <styled.ModalInfoWrapper>
                                <styled.ModalInfoExplain>병원 주소</styled.ModalInfoExplain>
                                <styled.ModalInfo>{props.doctorDetail.info.hospitalAddr}</styled.ModalInfo>
                            </styled.ModalInfoWrapper>
                        </styled.ModalBodyLeftAndRight>
                    </styled.ModalBodyWrapper>
                    <styled.ModalButtonWrapper>
                        <styled.ModalButton
                            onClick = {props.onAcceptRegReq}
                            isAccept = {true}
                        >
                            수락
                        </styled.ModalButton>
                        <styled.ModalButton
                            onClick = {props.onRejectRequest}
                            isAccept = {false}
                        >
                            거절
                        </styled.ModalButton>
                    </styled.ModalButtonWrapper>
                    </>
                </Modal> : null
            }
            <styled.ContentWrapper>
                <styled.ContentButtonWrapper>
                    <styled.ContentButton
                        isSelect = {props.viewType === 'reg'}
                        onClick = {props.onViewRegList}
                    >
                        가입 대기
                    </styled.ContentButton>
                    <styled.ContentButton
                        isSelect = {props.viewType === 'sec'}
                        onClick = {props.onViewSecList}
                    >
                        탈퇴 요청
                    </styled.ContentButton>
                </styled.ContentButtonWrapper>
                <styled.ContentTitle>
                    {
                        props.viewType === 'sec' ?
                        <>
                        탈퇴 대기 중 의사 회원
                        <styled.ContentExplain>
                            *승인을 누르면 탈퇴를 승인합니다.
                        </styled.ContentExplain>
                        </> :
                        <>
                        가입 대기 중 의사 회원
                        <styled.ContentExplain>
                            *클릭하면 상세정보를 확인할 수 있습니다.
                        </styled.ContentExplain>
                        </>
                    }
                </styled.ContentTitle>
                <styled.ContentInfoWrapper>
                    <styled.ContentInfo
                        isLast = {false}
                    >
                        분야
                    </styled.ContentInfo>
                    <styled.ContentInfo
                        isLast = {false}
                    >
                        이름
                    </styled.ContentInfo>
                    <styled.ContentInfo
                        isLast = {props.viewType !== 'sec'}
                    >
                        이메일
                    </styled.ContentInfo>
                    {
                        props.viewType === 'sec' ?
                        <styled.ContentInfo 
                            isLast = {true}
                        >
                            탈퇴 수락
                        </styled.ContentInfo> : null
                    }
                </styled.ContentInfoWrapper>
                <styled.ContentBody>
                    {
                        props.doctorList.length ?
                        props.doctorList.map((doctor : any) => {
                            return (
                                <styled.EachContentWrapper
                                    key = {doctor.doctorId}
                                    onClick = {() => props.onViewDetailReq(doctor.doctorId)}
                                    disabled = {props.viewType === 'sec'}
                                >
                                    <styled.EachContentNm
                                        isLast = {false}
                                    >
                                        {doctor.info.doctorType}
                                    </styled.EachContentNm>
                                    <styled.EachContentNm
                                        isLast = {false}
                                    >
                                        {doctor.info.doctorNm}
                                    </styled.EachContentNm>
                                    <styled.EachContentNm
                                        isLast = {props.viewType !== 'sec'}
                                    >
                                        {doctor.doctorId}
                                    </styled.EachContentNm>
                                    {
                                        props.viewType === 'sec' ?
                                        <styled.EachContentNm
                                            isLast = {true}
                                        >
                                            <styled.AcceptButton
                                                onClick = {() => props.onAcceptSecReq(doctor.doctorId)}
                                            >
                                                승인
                                            </styled.AcceptButton>
                                        </styled.EachContentNm> : null
                                    }
                                </styled.EachContentWrapper>
                            )
                        }) :
                        <styled.NothingWrapper>
                            🤔검색 결과가 없습니다.
                        </styled.NothingWrapper>
                    }
                </styled.ContentBody>
            </styled.ContentWrapper>
        </styled.Container>
    )
};

export default ManagerMenuPresenter;