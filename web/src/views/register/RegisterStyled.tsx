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
    padding : 0 0 5px 0;
    border : none;
    border-bottom : 1px solid #ddd;

    &::placeholder {
        color : #ddd;
    }
`;