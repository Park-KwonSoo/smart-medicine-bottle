import styled from 'styled-components';


export const Container = styled.div `
    width : 100%;
    height : 80vh;
    position : absolute;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const RegisterWrapper = styled.div `
    width : 35%;
    border : none;
    border-radius : 3px;

    display : flex;
    flex-direction : column;

    justify-content : center;
    align-items : center;
    
    padding : 30px 3px;

    box-shadow: 0px 0px 10px #a0a0a0;


`;

export const RegisterBackButtonWrapper = styled.div `
    width : 100%;
    border : none;

    display : flex;
    flex-direction : row-reverse;
    align-items : center;
    justify-content : space-between;

    margin : 0 0 10px 0;

`;

export const RegisterBackButton = styled.div `
    border : none;
    border-bottom : 1px solid;
    background-color : transparent;

    color : #a0a0a0;

    cursor : pointer;
    
    font-size : 12px;
    font-weight : 500;
    letter-spacing : 1px;

    padding : 1px 3px;
    margin : 0px 20px;

    transition : .25s all;

    &:hover {
        opacity : .7;
    }

`;

export const RegisterTitle = styled.div `
    font-size : 20px;
    font-weight : 700;
    margin : 0 0 20px 0;
    color : #343434;
`;

export const RegisterInfo = styled.div `
    width : 90%;
    font-size : 13px;
    color : #a0a0a0;
`;

export const RegisterInputWrapper = styled.div `
    margin : 20px 0 5px 0;
    width : 90%;
    display : flex;
    flex-direction : column;

    justify-content : flex-start;
    align-items : center;
`;

export const RegisterInputText = styled.div `
    width : 80%;
    font-size : 14px;
    font-weight : 600;
    margin : 0 0 10px 0;
    color : #343434;

`;

export const RegisterInput = styled.input `
    width : 80%;
    padding : 5px 10px;
    border : none;
    border-bottom : 1px solid #ddd;

    font-size : 14px;
    letter-spacing : 1px;

    &::placeholder {
        color : #ddd;
    }
`;

export const RegisterButtonWrapper = styled.div `
    margin : 20px 0 0 0;

    width : 100%;

    border : none;

    display : flex;
    justify-content : center;
    align-items : center;
`;

export const RegisterButton = styled.button `
    padding : 10px 30px;
    width : 80%;

    cursor : pointer;

    background-color : transparent;
    border : 1.2px solid;
    border-radius : 3px;

    color : #343434;

    transition : .25s all;

    &:hover {
        color : #fff;
        border : 1.2px solid #343434;
        background-color : #343434;
    }

`;