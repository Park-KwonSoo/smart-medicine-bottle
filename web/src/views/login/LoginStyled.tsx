import styled from 'styled-components';

export const Container = styled.div `
    width : 1180px;
`;

export const LoginWrapper = styled.div `
    width : 50%;
    border : 1px solid;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    padding : 20px 3px;
`;

export const LoginInputWrapper = styled.div `
    margin : 10px 0;
    width : 30%;
`;

export const LoginEachInputWrapper = styled.div `
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

export const LoginInputText = styled.div `
    margin : 5px 0;

    text-align : center;
`;

export const LoginInput = styled.input `
    border : 1px solid;
    height : 30px;
    width : 100%;
`;

export const LoginButtonWrapper = styled.div `
    width: 30%;
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
`;

export const LoginButton = styled.button `
    margin : 5px 0 5px 0;
`;