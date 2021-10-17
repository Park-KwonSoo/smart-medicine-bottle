import styled from 'styled-components';

export const Container = styled.div `
    width : 100%;
    position : relative;

    margin : 5px 0;
    padding : 20px 5px;

    border-top : 1px solid #ddd;

    display : flex;
    flex-direction : column;
`;

export const InfoWrapper = styled.div `
    display : flex;
    flex-direction : row;

    border : none;
    background-color : transparent;
`;

export const LicenseWrapper = styled.div `
    flex : 1;
    display : flex;
    flex-direction : column;

    border : none;
    background-color : transparent;
    justify-content : center;
    align-items : flex-start;

`;

export const LicenseExplain = styled.div `
    color : #a0a0a0;
    font-size : 14px;

    font-weight : 400;
    padding : 0 5px;

    border : none;
`;

export const LicenseImg = styled.img `
    height : 60px;
    width : 150px;
`;

export const ServiceInfoWrapper = styled.div `
    flex : 3;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;

    border : none;
    background-color : transparent;
`;

export const ServiceInfoEach = styled.div `
    color : #d0d0d0;
    font-size : 13px;
    
    font-weight : 400
`;