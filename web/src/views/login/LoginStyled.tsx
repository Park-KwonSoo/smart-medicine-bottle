import styled, { keyframes} from 'styled-components';


const twinkle = keyframes `
    0% {
        opacity : 1;
        background-color : #337DFF;
    }
    20% {
        opacity : .75;
    }
    40% {
        opacity : .5;
    }
    60% {
        opacity : .5;
    }
    80% {
        opacity : .75;
    }
    100% {
        opacity : 1;
        background-color : #337DFF;
    }
`

const twinkleText = keyframes `
    0% {
        opacity : 1;
    }
    20% {
        opacity : .75;
    }
    40% {
        opacity : .5;
    }
    60% {
        opacity : .5;
    }
    80% {
        opacity : .75;
    }
    100% {
        opacity : 1;
    }
`;

export const Container = styled.div `
    width : 100%;
    height : 80vh;
    position : absolute;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const LoginWrapper = styled.div `
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

export const LoginTitle = styled.div `
    font-size : 20px;
    font-weight : 700;
`;

export const LoginInputWrapper = styled.div `
    margin : 10px 0;
    width : 80%;
`;

export const LoginEachInputWrapper = styled.div `
    display : flex;
    flex-direction : column;
    justify-content : center;

`;

export const LoginInputText = styled.div `
    width : 100%;
    margin : 30px 0 10px 0;
`;

export const LoginInput = styled.input `
    border : 1px solid #a0a0a0;
    padding : 10px;
    border-radius : 3px;
    width : 100%;
    align-self : center;
`;

export const RegisterButtonWrapper = styled.div `
    margin : 10px 0 0 0;
    display : flex;

    width : 80%;

    justify-content : flex-end;
    align-items : center;
`;

export const RegisterButton = styled.button `
    border : none;
    border-bottom : 1px solid;
    background-color : transparent;
    color : #337DFF;

    cursor : pointer;

    font-size : 11px;

    &:hover { 
        animation : ${twinkleText} 2s infinite;
    }
    
`;

export const LoginButtonWrapper = styled.div `
    margin : 25px 0 0 0;
    width: 100%;
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
    
`;

export const LoginButton = styled.button<{isLoginButton : boolean}> `
    background-color : #fff;
    border : 1.2px solid;
    border-radius : 5px;
    padding : 10px 30px;

    width : 80%;

    cursor : pointer;
    
    color : #343434;
    font-weight : 600;

    &:hover {
        background-color : #343434;
        color : #fff;
        border : 1.2px solid transparent;
        animation : ${twinkle} 1.5s infinite linear;
    }

    margin : 0 15px;
`;