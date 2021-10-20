import styled from 'styled-components';


export const Container = styled.div `
    width : 100%;
    height : 80vh;

    display : flex;
    justify-content : center;
    align-items : center;
`;


export const ModalTitleWrapper = styled.div `
    flex : 1;
    border : none;
    border-bottom : 1px solid #ddd;
    width : 100%;

    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

export const ModalTitle = styled.div `
    font-size : 20px;
    font-weight : 700;
    letter-spacing : 1px;

    color : #337DFF;
`;

export const ModalBodyWrapper = styled.div `
    flex : 5;
    width : 100%;

    border : none;

    display : flex;
    flex-direction : row;

`;

export const ModalBodyLeftAndRight = styled.div `
    flex : 1;

    border : none;

    padding : 20px;

    display : flex;
    flex-direction : column;
    justify-content :center;
    align-items : center;
`;

export const ModalInfoWrapper = styled.div `
    flex : 1;
    border : none;
    
    width : 80%;

    display : flex;
    flex-direction : column;

    justify-content : center;
    align-items : flex-start;

`;

export const ModalInfoExplain = styled.div `
    font-size : 16px;
    font-weight : 500;

    letter-spacing : 1px;

    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;

    border : none;
    border-bottom : 1px solid #337DFF;

    color : #337DFF;
    padding : 2px 1px;
`;

export const ModalInfo = styled.div `
    margin : 5px 0 10px 0;
    font-size : 13px;
    font-weight : 600;

    letter-spacing : 1px;

    display : flex;
    flex-direction : row;
    align-items : center;
`;

export const ModalInfoNotice = styled.div `
    font-size : 11px;
    color : #bbb;

    font-weight : 400;

    letter-spacing : 0px;

    margin : 5px 0 0px 0;
`;

export const DoctorLicenseViewWrapper = styled.div `
    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;
    
    border : none;
    background-color : transparent;
`;
    
export const DoctorLicenseViewButton = styled.button `
    margin : 5px 0 0 7px;

    border : 1px solid #343434;
    border-radius : 3px;
    background-color : #EAF2FF;
    padding : 2px 5px;

    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
    
    cursor : pointer;
    transition : .25s all;

    &:hover {
        border : 1px solid #337DFF;
        background-color : #337DFF;
        color : #fff;
    }

    font-size : 11px;
`;

export const DoctorLicenseViewInput = styled.input `
    padding : 2px 1px;

    font-size : 11px;
    letter-spacing : 1px;
    color : #343434;

    border : none;
    border-bottom : 1px solid #343434;

    &::placeholder {
        color : #ccc;
    }
`;

export const ValidateButton = styled.button<{validate : string}> `
    font-size : 11px;

    margin : 0 0 0 5px;
    padding : 2px 5px;
    
    border-radius : 3px;

    border : ${props => props.validate === 'W' ? '1px solid #343434'
        : props.validate === 'Y' ? '1px solid #337DFF'
        : props.validate === 'N' ? '1px solid #dedede' : 'transparent'
    };
    background-color : ${props => props.validate === 'W' ? 'transparent'
        : props.validate === 'Y' ? '#377DFF'
        : props.validate === 'N' ? '#f2f2f2' : 'transparent'
    };
    color : ${props => props.validate === 'W' ? '#343434'
        : props.validate === 'Y' ? '#fff'
        : props.validate === 'N' ? '#a0a0a0' : 'transparent'
    };


    transition : .25s all;

    :not(:disabled) {
        cursor : pointer;
        &:hover {
            background-color : #343434;
            color : #fff;
            border : 1px solid #343434;
        }
    }

`;

export const ModalButtonWrapper = styled.div `
    flex : 1.5;

    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;

    border : none
`;

export const ModalButton = styled.button<{isAccept : boolean}> `
    margin : 0 30px;
    border-radius : 3px;
    border : 1px solid #337DFF;

    background-color : ${props => props.isAccept ? '#337DFF' : 'transparent'};
    color : ${props => props.isAccept ? '#fff' : '#337DFF'};

    font-size : 18px;
    font-weight : 600;
    letter-spacing : 1px;
    
    padding : 10px 40px;

    display : flex;
    justify-content : center;
    align-items : center;

    cursor : pointer;
    
    transition : .25s all;

    &:hover {
        background-color : #343434;
        color : #fff;
        border : 1px solid #343434;
    }
    

`;


export const ContentWrapper = styled.div `
    height : 80%;
    width : 60%;

    border : 1px solid #ddd;
    border-radius : 4px;

    box-shadow: 0px 0px 10px #a0a0a0;

`;

export const ContentButtonWrapper = styled.div `
    width : 100%;
    height : 10%;
    border : none;

    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : flex-end;

    gap : 10%;

    background-color : transparent;
`;

export const ContentButton = styled.button<{isSelect : boolean}> `
    background-color : ${props => props.isSelect ? '#337DFF' : 'transparent'};
    color : ${props => props.isSelect ? '#fff' : '#337DFF'};
    border : 1px solid #337DFF;
    border-radius : 4px;

    padding : 4px 10px;

    cursor : pointer;

    display : flex;
    justify-content : center;
    align-items : center;

    transition : .25s all;

    &:hover {
        opacity : .5;
    }
`;

export const ContentTitle = styled.div `
    width : 100%;
    height : 20%;
    border : none;
    border-bottom : 1px solid #ddd;

    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;

    font-size : 22px;
    font-weight : 600;
    letter-spacing : 1px;

    color : #343434;
`;

export const ContentExplain = styled.div `
    margin : 2px 0 0 0;
    font-size : 14px;
    color : #a0a0a0;
    font-weight : 500;
    letter-spacing : 1px;

`;

export const ContentBody = styled.div `
    overflow : scroll;

    min-height : 60%;
    max-height : 60%;

    border : none;

    display : flex;
    flex-direction : column;
    align-items : center;

    padding : 0 0 0 3px;

    &::-webkit-scrollbar {
        width : 3px;
        background-color : transparent;
        height : 0px;
    }

    &::-webkit-scrollbar-thumb {
        background-color : #337DFF;
    }
`;

export const ContentInfoWrapper = styled.div `
    width : 100%;
    height : 10%;
    border : none;
    border-bottom : 1px solid #a0a0a0;

    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;

`;

export const ContentInfo = styled.div<{isLast : boolean}> `
    flex : 1;
    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;

    font-size : 16px;
    font-weight : 600;

    color : #377DFF;

    border : none;

    border-right : ${props => props.isLast ? '1px solid transparent' : '1px solid #ddd'};
`;

export const EachContentWrapper = styled.button `
    width : 100%;
    border : none;
    border-bottom : 1px solid #ddd;

    background-color : transparent;

    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;

    color : #343434;

    padding : 10px 0px;

    :not(:disabled) {
        cursor : pointer;

        transition : .1s all;

        &:hover {
            background-color : #337DFF;
            color : #fff;
        }
    }

`;

export const EachContentNm = styled.div<{isLast : boolean}> `
    flex : 1;
    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;

    font-size : 14px;
    font-weight : 500;


    border : none;

    border-right : ${props => props.isLast ? '1px solid transparent' : '1px solid #ddd'};

`;

export const AcceptButton = styled.button `
    background-color : transparent;
    color : #337DFF;
    border : 1px solid #337DFF;
    border-radius : 3px;
    padding : 2px 10px;

    display : flex;
    justify-content : center;
    align-items : center;

    cursor : pointer;

    transition : .25s all;

    &:hover {
        background-color : #337DFF;
        color : #fff;
    }
`;

export const NothingWrapper = styled.div `
    height : 100%;
    width : 100%;

    border : none;

    display : flex;
    justify-content : center;
    align-items : center;

    color : #a0a0a0;
`;