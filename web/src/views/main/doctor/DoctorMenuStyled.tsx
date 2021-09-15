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


export const Container = styled.div `
    height : 100vh;
    width : 100%;
    display : flex;
    flex-direction : column;
    justify-content : center;
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

export const NewPatientRegisterTitle = styled.div `
    font-size : 20px;
    font-weight : 700;

    color : #337DFF;
    letter-spacing : 1px;
`;

export const NewPatientSearchWrapper = styled.div `
    margin : 20px 0 0 0;

    border : none;
    border-bottom : 1px solid #ddd;

    width : 80%;
    padding : 0 10px 5px 10px;

    display : flex;
    flex-direction : row;

    justify-content : space-between;
`;

export const NewPatientSearchInput = styled.input `
    border : none;
    width : 80%;
`;

export const NewPatientSearchButton = styled.button `
    border : none;
    background-color : transparent;
    
    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;

    cursor : pointer;

    transition : .25s all;
    &:hover  {
        opacity : .5;
    }
`;

export const NewPatientSearchButtonImg = styled.img `
    height : 20px;
    width : 20px;
`;

export const NewPatientSearchResultWrapper = styled.div `
    border : 1px solid #337DFF;
    margin : 10px 0 0 0;

    width : 80%;
    padding : 10px;

    height : 100px;

    display : flex;
    justify-content : center;
    align-items : center; 

    font-size : 14px;
    color : #a0a0a0;
    font-weight : 600;
`;

export const NewPatientSearchResult = styled.div `
    border : none;

    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
`;

export const NewPatientSearchResultInfoWrapper = styled.div `
    display : flex;
`;

export const NewPatientSearchResultInfo = styled.div `
    font-size : 13px;
    font-weight : 600;
    color : #a0a0a0;

    margin : 0 5px 0 0;
`;

export const NewPatientSearchResultInfoText = styled.div `
    font-size : 14px;
    color : #343434;
    font-weight : 600;
    letter-spacing : 1px;
`;

export const NewPatientRegisterButtonWrapper = styled.div `
    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items :center;

    margin : 20px 0 0 0;
`;

export const NewPatientRegisterButton = styled.button `
    background-color : #fff;
    color : #337DFF;
    border : 1px solid #337DFF;
    border-radius : 3px;

    cursor : pointer;

    transition : .25s all;

    font-size : 16px;
    font-weight : 600;

    padding : 10px 30px;
    margin : 0 10px;

    &:hover {
        background-color : #337DFF;
        color : #fff;
        border : 1px solid transparent;
    }
`;


export const PatientInfoViewContainer = styled.div `
    overflow : scroll;
    flex : 6;

    border : none;
    width : 100%;

    display : flex;
    flex-direction : column;

    &::-webkit-scrollbar {
        width : 3px;
        background-color : transparent;
        height : 1px;
    }

    &::-webkit-scrollbar-thumb {
        background-color : #337DFF;
    }
`;

export const PatientInfoPatientNmWrapper = styled.div `
    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;
    
    width : 100%;

    padding : 15px 0;

    border : none;
    border-bottom : 1px solid #ddd;

`;

export const PatientInfoPatientNmInfo = styled.div `
    font-size : 15px;
    font-weight : 500;
    margin : 0 5px;
`;

export const PatientInfoPatientNm = styled.div `
    font-size : 20px;
    font-weight : 700;
    margin : 0 5px;
    letter-spacing : 1px;

    color : #337DFF;
`;

export const PatientInfoView = styled.div `
    padding : 15px 15px;

    font-size : 15px;
    font-weight : 500;
    letter-spacing : 1px;

`;

export const PatientInfoEditWrapper = styled.div `
    flex : 3;

    border : none;
    width : 100%;

    display : flex;
    justify-content : center;
    align-items : center;

`;

export const PatientInfoEditInput = styled.textarea `
    width : 100%;

    resize : none;

    padding : 15px;
    margin : 15px;
    border : 1px solid #ddd;
`;

export const PatientInfoEditButtonWrapper = styled.div `
    flex : 2;

    border : none;
    width : 100%;

    display : flex;
    flex-direction : row;

    justify-content : center;
    align-items : center;

    gap : 8%;

`;

export const PatientInfoEditButton = styled.button `
    background-color : #fff;
    color : #337DFF;
    border : 1px solid #337DFF;
    border-radius : 3px;

    cursor : pointer;

    transition : .25s all;

    font-size : 16px;
    font-weight : 600;

    padding : 10px 30px;
    margin : 0 10px;

    &:hover {
        background-color : #337DFF;
        color : #fff;
        border : 1px solid transparent;
    }
`;

export const MedicineSearchTitle = styled.div `
    font-size : 20px;
    font-weight : 700;

    color : #337DFF;
`;

export const MedicineSearchInputWrapper = styled.div `
    margin : 20px 0;

    display : flex;
    flex-direction : row;

    justify-content : space-between;
    align-items : center;

    width : 80%;

    border : none;
    border-bottom : 1px solid #343434;
`;

export const MedicineSearchInput = styled.input `
    width : 80%;
    border : none;
    padding : 10px;

    font-size : 15px;
    font-weight : 500;

    color : #343434;

    transition : .25s all;

    &::placeholder {
        color : #dedede;
    }
`;

export const MedicineSearchButton = styled.button `
    width : 30px;
    height : 30px;

    display : flex;
    justify-content : center;
    align-items : center;

    border : none;
    background : transparent;

    cursor : pointer;

    transition : .25s all;

    &:hover {
        opacity : .5;
    }

`;

export const MedicineSearchButtonImg = styled.img `
    height : 15px;
    width : 15px;
    
    transition : .25s all;
`;

export const MedicineSearchResultWrapper = styled.div `
    overflow : scroll;

    border : 1px solid;
    min-height : 180px;
    max-height : 180px;

    width : 80%;

    border : .5px solid #337DFF;

    &::-webkit-scrollbar {
        width : 3px;
        background-color : transparent;
        height : 1px;
    }

    &::-webkit-scrollbar-thumb {
        background-color : #337DFF;
    }
`;

export const MedicineSearchResultEach = styled.button `
    width : 100%;
    height : 36px;

    display : flex;
    flex-direction : row;

    align-items : center;
    justify-content : space-between;

    border : none;
    border-bottom : 1px solid #dedede;

    cursor : pointer;

    background : transparent;
    color : #343434;

    font-size : 15px;
    font-weight : 500;

    transition : .1s all;

    &:hover {
        background-color : #337DFF;
        color : #fff;
    }

`;

export const MedicineSearchResultEachInfo = styled.div `
    margin : 0 10px;
`;

export const MedicineSelectButtonImg = styled.img `
    height : 15px;
    width : 15px;
`;

export const MedicineDosageSetWrapper = styled.div `
    width : 80%;
    
    display : flex;
    flex-direction : column;

    justify-content : center;
    align-items : center;

    border : none;

    margin : 20px 0;

    height : 200px;
`;

export const MedicineDosageInfo = styled.div `
    font-size : 15px;
    font-weight : 500;

    color : #a0a0a0;

    width : 100%;
    margin : 0 0 20px 0;

    border : none;
    background-color : transparent;

    text-align : center;
`;

export const MedicineDosageInput = styled.input.attrs({
    type : 'number',
    min : '1',
    max : '3',
}) `
    width : 40%;

    padding : 10px 20px;
    color : #337DFF;
    font-size : 20px;

    font-weight : 700;

    border : none;
    border-bottom : 1px solid #337DFF;

    display : flex;
    flex-direction : row;

    text-align : center;

    transition : .25s all;
`;

export const MedicineQRCodeWrapper = styled.div `
    width : 80%;
    height : 200px;

    display : flex;
    flex-direction : column;

    justify-content : center;
    align-items : center;

    margin : 20px 0;

    border : none;
`;

export const MedicineQRCodeInfo = styled.div `
    font-size : 15px;
    font-weight : 500;

    color : #a0a0a0;

    text-align : center;
`;

export const MedicineQRCode = styled.img `
    margin : 10px 0 0 0;

    height : 170px;
    width : 170px;
`;

export const MedicinePrescribeButtonWrapper = styled.div `
    margin : 20px 0 0 0;
    
    width : 40%;

    display : flex;
    flex-direction : row;

    justify-content : space-between;

`;

export const MedicinePrescribeButton = styled.button<{isClose : boolean}> `
    height : 40px;
    width : 100px;

    background-color : ${props => props.isClose ? 'transparent' : '#337DFF'};
    border : 1px solid ${props => props.isClose ? '#343434' : '#337DFF'};
    border-radius : 4px;

    font-size : 16px;
    font-weight : 600;

    color : ${props => props.isClose ? '#343434' : '#fff'};

    cursor : pointer;

    transition : .25s all;

    &:hover {
        opacity : .7;
    }
`;


export const InfoAndSearchWrapper = styled.div `
    flex : 3;
    display : flex;
    flex-direction : row;

    margin : 0 0 10px 0;
`;

export const InfoWrapper = styled.div `
    flex : 2;

    display : flex;
    flex-direction : column;
    padding : 10px;
`;

export const InfoSquare = styled.div `
    overflow : scroll;

    border : 1px solid #ddd;
    border-radius : 5px;

    background-color : transparent;

    height : 300px;

    margin : 0 0 20px 0;

    box-shadow: 0px 0px 5px #a0a0a0;

    padding : 20px;
    display : flex;
    flex-direction : column;
    align-items : center;

    &::-webkit-scrollbar {
        width : 3px;
        background-color : transparent;
        height : 1px;
    }

    &::-webkit-scrollbar-thumb {
        background-color : #337DFF;
    }
    
`;

export const EditPatientInfoButton = styled.button `
    display : flex;
    flex-direction : row;

    align-self : flex-end;

    justify-content : center;
    align-items : center;

    border : none;
    background-color : transparent;

    cursor : pointer;

    transition : .25s all;
    &:hover {
        opacity : .5;
    }
`;

export const EditPatientInfoButtonImg = styled.img `
    height : 15px;
    width : 15px;
    margin : 0 5px 0 0;
`;

export const EditPatientInfoButtonText = styled.div `
    font-size : 12px;
    font-weight : 600;
`;

export const InfoEachWrapper  = styled.div `
    display : flex;
    flex-direction : column;
    
    justify-content : flex-start;
    align-items : flex-start;

    width : 100%;
    border : none;

    margin : 0 0 20px 0;
`;

export const InfoEachTopic = styled.div `
    margin : 0 0 5px 0;
    font-size : 14px;
    font-weight : 700;
    
    color : #337DFF;
`;

export const InfoEachText = styled.div `
    font-size : 18px;
    font-weight : bold;

    border : none;
    border-bottom : 2px solid #337DFF;

    padding : 0px 10px 2px 10px;
`;

export const PatientInfo = styled.div `
    font-size : 15px;
`;

export const NewPatientButton = styled.button `
    flex : 1;
    border : 1px solid #ddd;
    border-radius : 3px;

    background-color : #fff;
    color : #337DFF;

    padding : 10px 30px;

    transition : .25s all;

    font-size : 18px;
    font-weight : 700;

    cursor : pointer;

    &:hover { 
        background-color : #337DFF;
        color : #fff;
    }

    &:disabled {
        cursor : default;
        background-color : #337DFF;
        color : #fff;
    }
`;

export const SearchAndDetailWrapper = styled.div `
    flex : 5;

    display : flex;
    flex-direction : column;

    padding : 10px;

`;

export const SearchBarWrapper = styled.div `
    flex : 1;
    border : 1px solid #ddd;
    border-radius : 3px;    
    background-color : transparent;

    display : flex;
    flex-direction : row;
    
    padding : 10px;

    align-items : center;
    justify-content : space-around;

    margin : 0 0 10px 0;

`;

export const SearchBar = styled.input `
    border : none;
    border-bottom : 2px solid #ddd;
    width : 80%;
    margin : 0 10px 0 20px;
    padding : 10px 0px;
`;

export const SearchButton = styled.button `
    border : 1px solid #ddd;
    border-radius : 3px;

    background-color : transparent;
    opacity : .7;

    height : 50px;
    width : 50px;

    transition : .25s all;

    cursor : pointer;

    display : flex;
    justify-content : center;
    align-items : center;

    &:hover {
        opacity : 1;
    }
`;

export const SearchButtonImg = styled.img `
    height : 20px;
    width : 20px;
`;

export const SearchResultWrapper = styled.div `
    flex : 5;
    border : 1px solid #ddd;
    border-radius : 3px;
    background-color : transparent;

`;

export const SearchResultInfo = styled.div `
    display : flex;
    flex-direction : row;

    border : none;
    border-bottom : 2px solid #ddd;

    padding : 5px 20px;
`;

export const SearchResultInfoEach = styled.div<{isLast : boolean}> `
    flex : 1;
    text-align : center;

    font-size : 18px;
    font-weight : 600;

    border : none;
    border-right : ${props => props.isLast ? 'none' : '1px solid #ddd'};
`;

export const SearchResultEach = styled.div `
    display : flex;
    flex-direction : row;

    border : none;
    border-bottom : 1px solid #ddd;
    align-items : center;

    background-color : transparent;
    color : #337DFF;

    padding : 10px 20px;

    cursor : pointer;

    transition : .25s all;
    &:hover {
        background-color : #337DFF;
        color : #fff;
    }
`;

export const SearchResultEachText = styled.div<{isLast : boolean}> `
    flex : 1;

    text-align : center;
    border : none;
    border-right : ${props => props.isLast ? 'none' : '1px solid #ddd'};
`;

export const BottleListWrapper = styled.div `
    overflow : scroll;

    flex : 2;
    display : flex;
    flex-direction : row;

    border : 1px solid #ddd;
    border-radius : 3px;

    padding : 20px;

    margin : 0 0 10px 0;

    box-shadow: 0px 2px 5px 0px #a0a0a0;

    &::-webkit-scrollbar {
        width : 0px;
        background-color : transparent;
        height : 3px;
    }

    &::-webkit-scrollbar-thumb {
        background-color : #337DFF;
    }

`;

export const EachBottleWrapper = styled.div `
    height : 100%;
    min-width : 200px;
    border : 1px solid #ddd;
    border-radius : 3px;

    display : flex;
    flex-direction : column;

    justify-content : center;
    align-items : center;

    margin : 0 20px 0 0;

    cursor : pointer;
    transition : .25s all;
    &:hover {
        opacity : .5;
    }
`;

export const EachBottleImg = styled.img `
    height : 50px;
    width : 50px;
    margin : 0 0 10px 0;
`;

export const EachBottleInfo = styled.div `
    font-size : 11px;
    letter-spacing : 1px;
`;

export const NothingWrapper = styled.div `
    height : 100%;
    width : 100%;

    display : flex;
    justify-content : center;
    align-items : center;

    color : #a0a0a0;
`;