import styled, { keyframes } from 'styled-components';


const ModalOn = keyframes `
    0% {
        background-color : rgba(52, 52, 52, .0);
    }
    20% {
        background-color : rgba(52, 52, 52, .2);
    }
    40% {
        background-color : rgba(52, 52, 52, .4);
    }
    60% {
        background-color : rgba(52, 52, 52, .5);
    }
    80% {
        background-color : rgba(52, 52, 52, .6);
    }
    100% {
        background-color : rgba(52, 52, 52, .7);
    }

`;


export const ModalContainer = styled.div `
    height : 100%;
    width : 100%;
    z-index : 99;
    position : absolute;

    display : flex;
    flex-direction : column;

    animation : ${ModalOn} .5s;

    background-color : rgba(52, 52, 52, .7);

`;

export const ModalClsButtonWrapper = styled.div `
    flex : 1;    

    display : flex;

    justify-content : flex-end;
    align-items : center;
    padding : 0 20px;

    border : none;
    background-color : transprent;    
`;

export const ModalClsButton = styled.button `
    border : none;
    background-color : transparent;

    cursor : pointer;

    color : #fff;

    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;

    transition : .25s all;
    &:hover {
        opacity : .5;
    }
`;

export const ModalClsButtonImg = styled.img `
    height : 20px;
    width : 20px;

    margin : 0 10px 0 0;
`;

export const ModalClsButtonText = styled.div `
    font-size : 18px;
    font-weight : 700;
`;

export const ModalContentWrapper = styled.div `
    flex : 8;

    display : flex;
    flex-direction : column;

    justify-content : center;
    align-items : center;

    border : none;
`;

export const ModalContent = styled.div `
    width : 600px;
    height : 400px;

    background-color : #fff;
    border : 1.2px solid #337DFF;
    border-radius : 5px;
    
    display : flex;
    flex-direction : column;

    justify-content : center;
    align-items : center;
`;