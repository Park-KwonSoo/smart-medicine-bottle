import React from 'react';

import * as styled from './ModalStyled';

const closeButton = '/static/img/close.png';


interface ModalProps {
    children : JSX.Element,
    onModalClose : () => void;
}

const ModalContainer = (props : ModalProps) => {
    return (
        <styled.ModalContainer>
            <styled.ModalClsButtonWrapper>
                <styled.ModalClsButton
                    onClick = {props.onModalClose}
                >
                    <styled.ModalClsButtonImg src = {closeButton}/>
                    <styled.ModalClsButtonText>닫기</styled.ModalClsButtonText>
                </styled.ModalClsButton>
            </styled.ModalClsButtonWrapper>
            <styled.ModalContentWrapper>
                <styled.ModalContent>
                    {props.children}
                </styled.ModalContent>
            </styled.ModalContentWrapper>
            <styled.ModalClsButtonWrapper />
        </styled.ModalContainer>
    );
};

export default ModalContainer;