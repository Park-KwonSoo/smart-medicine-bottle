import styled from 'styled-components';


export const Container = styled.div `
    width : 100%;
    height : 80vh;
    position : absolute;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const SearchTitle  = styled.div `
    font-weight : 600;
    font-size : 20;

    color : #337DFF;

    display : flex;
    flex-direction : row;

    align-items : center;
    justify-content : center;

`;

export const SearchResultCount = styled.div `
    color : #343434;
`;

export const HospitalListWrapper = styled.div `
    margin : 20px 0;

    height : 200px;
    width : 80%;

    border : 1px solid #337DFF;
    border-radius : 3px;
    
    display : flex;
    flex-direction : column;
`;

export const HospitalListInfo = styled.div `

    height : 25px;
    width : 100%;

    border : none;
    border-bottom : 2px solid #ddd;

    display : flex;
    flex-direction : row;
`;

export const HospitalListInfoEach = styled.div<{isLast : boolean}> `
    flex : ${props => props.isLast ? '1' : '3'}; 

    display : flex;
    align-items : center;
    justify-content : center;
    
    font-size : 14px;
    font-weight : 500;

    color : #343434;

    border : none;
    border-right : ${props => props.isLast ? 'none' : '1px solid #ddd'};

    padding : 3px 5px;
`;

export const HospitalListEach = styled.div `
    min-height : 34px;
    max-height : 34px;
    width : 100%;

    display : flex;
    flex-direction : row;

    border : none;
    border-bottom : 1px solid #ddd;
`;

export const HospitalListEachInfo = styled.div<{isLast : boolean}> `
    flex : ${props => props.isLast ? '1' : '3'}; 

    display : flex;

    font-size : 12px;
    font-weight : 500;

    justify-content : center;
    align-items : center;

    border : none;
    border-right : ${props => props.isLast ? 'none' : '1px solid #ddd'};

    padding : 3px 5px;
`;

export const CheckButton = styled.button `
    border : none;
    background-color : transparent;

    height : 15px;
    width : 15px;

    display : flex;
    flex-direction : row;
    justify-content : center;

    cursor : pointer;
    transition : .25s all;

    &:hover {
        opacity : .5;
    }
`;

export const CheckButtonImg = styled.img `
    height : 15px;
    width : 15px;
`;

export const PageWrapper = styled.div `
    width : 50%;
    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;

    gap : 2%;
`;

export const PageButton = styled.button<{isSelect : boolean}> `
    height : 18px;
    width : 18px;
    
    display : flex;
    align-items : center;
    justify-content : center;

    border : none;
    border-radius : 4px;
    background-color : ${props => props.isSelect ? '#337DFF' : 'transparent'};
    color : ${props => props.isSelect ? '#fff' : '#343434'};

    font-size : 12px;
    font-weight : 600;

    cursor : pointer;

    transition : .25s all;

    &:hover {
        opacity : .7;
    }
`;

export const PageArrowImg = styled.img `
    height : 15px;
    width : 15px;
`;

export const ModalButtonWrapper = styled.div `
    margin : 20px 0 0 0;
    width : 50%;

    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;

    border : none;

    gap : 10%;
`;

export const ModalButton = styled.div<{isCloseButton : boolean}> `
    padding : 2.5% 10%;
    cursor : pointer;

    border : 1px solid ${props => props.isCloseButton ? '#343434' : '#337DFF'};
    background-color : ${props => props.isCloseButton ? 'transparent' : '#337DFF'};

    border-radius : 5px;

    color : ${props => props.isCloseButton ? '#343434' : '#fff'};
    font-weight : 600;
    font-size : 16px;

    transition : .25s all;

    &:hover {
        opacity : .7;
    }

`


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

export const RegisterInputWrapperForSearch = styled.div `
    display : flex;
    flex-direction : row;

    justify-content : center;

    width : 100%;

    border : none;
    background-color : transparent;
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

export const RegisterInputSearchButton = styled.button `
    position : absolute;

    height : 25px;
    width : 25px;

    align-self : end;

    margin : 0 0 1px 24%;

    background-color : transparent;
    border : none;

    transition : .25s all;
    &:hover {
        opacity : .5;
    }

    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;

    cursor : pointer;
`;

export const RegisterInputSearchButtonImg = styled.img `
    height : 20px;
    width : 20px; 
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