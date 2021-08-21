import React from 'react';

import  * as styled from './ManagerMenuStyled';

const closeButton = '/static/img/close.png';



interface ManagerMenuProps {
    doctorRegReqList : any[];

    doctorDetail : any;
    modalUp : boolean;
    setModalUp : any;
    onViewDetailReq : (arg0 : string) => void;

    onAcceptRequest : () => void;
    onRejectRequest : () => void;

}

const ManagerMenuPresenter = (props : ManagerMenuProps) => {
    return (
        <styled.Container>
            {
                props.modalUp ? 
                <styled.ModalContainer>
                    <styled.ModalClsButtonWrapper>
                        <styled.ModalClsButton
                            onClick = {() => props.setModalUp(false)}
                        >
                            <styled.ModalClsButtonImg src = {closeButton}/>
                            <styled.ModalClsButtonText>닫기</styled.ModalClsButtonText>
                        </styled.ModalClsButton>
                    </styled.ModalClsButtonWrapper>
                    <styled.ModalContentWrapper>
                        <styled.ModalContent>
                            <styled.ModalTitleWrapper>
                                <styled.ModalTitle>가입 요청 정보</styled.ModalTitle>
                            </styled.ModalTitleWrapper>
                            <styled.ModalBodyWrapper>
                                <styled.ModalBodyLeftAndRight>
                                    <styled.ModalInfoWrapper>
                                        <styled.ModalInfoExplain>의사 자격 번호</styled.ModalInfoExplain>
                                        <styled.ModalInfo>{props.doctorDetail.info.doctorLicense}</styled.ModalInfo>
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
                                    onClick = {props.onAcceptRequest}
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
                        </styled.ModalContent>
                    </styled.ModalContentWrapper>
                    <styled.ModalClsButtonWrapper/>
                </styled.ModalContainer> : null
            }
            <styled.ContentWrapper>
                <styled.ContentTitle>
                    가입 대기 중 의사 회원
                    <styled.ContentExplain>
                        *클릭하면 상세정보를 확인할 수 있습니다.
                    </styled.ContentExplain>
                </styled.ContentTitle>
                <styled.ContentBody>
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
                            isLast = {true}
                        >
                            이메일
                        </styled.ContentInfo>
                    </styled.ContentInfoWrapper>
                    {
                        props.doctorRegReqList.map((doctor : any) => {
                            return (
                                <styled.EachContentWrapper
                                    key = {doctor.doctorId}
                                    onClick = {() => props.onViewDetailReq(doctor.doctorId)}
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
                                        isLast = {true}
                                    >
                                        {doctor.doctorId}
                                    </styled.EachContentNm>
                                </styled.EachContentWrapper>
                            )
                        })
                    }
                </styled.ContentBody>
            </styled.ContentWrapper>
        </styled.Container>
    )
};

export default ManagerMenuPresenter;