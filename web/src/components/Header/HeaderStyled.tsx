import styled from 'styled-components';

export const Container = styled.div `
    width : 100%;
    position : relative;
    padding : 20px 0;
    box-shadow: 0px 0px 10px #a0a0a0;
    margin : 0 0 15px 0;
    z-index : 50;

    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
`;

export const HeaderLeftWrapper = styled.div `
    flex : 1;
    display : flex;
    flex-direction : row;
    justify-content : flex-start;
    align-items : center;

    border : none;

    margin : 0 30px;
`;

export const HeaderRightWrapper = styled.div `
    flex : 1;
    display : flex;
    flex-direction : row;
    justify-content : flex-end;
    align-items : center;

    border : none;

    margin : 0 30px;

`;

export const HeaderCenterWrapper = styled.div `
    flex : 3;
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;

    border : none;
`;

export const TitleImg = styled.img `
    height : 30px;
    width : 30px;

    margin : 0 10px 0 0px;
`;

export const Title = styled.div `
    text-align : center;
    font-size : 17px;
    font-weight : 800;
`;

export const Backbutton = styled.button `
    border : 1px solid #337DFF;
    border-radius : 5px;
    background-color : transparent;
    color : #337DFF;
    padding : 4px 17px;

    transition : .25s all;

    display : flex;
    flex-direction : row;
    justify-content : center;

    cursor : pointer;

    &:hover {
        opacity : .5;
    }
`;

export const BackbuttonImg = styled.img `
    height : 14px;
    width : 14px;
    margin : 0 6px 0 0;
`;

export const BackbuttonText = styled.div `
    font-size : 15px;
    font-weight : 700;
    letter-spacing : 1px;
`;

export const LogoutButton = styled.button `
    display : flex;
    justify-content : center;
    // align-items : center;

    background-color : transparent;
    border : none;
    border-bottom : 1px solid #a0a0a0;
    padding : 0 4px 4px 4px;

    cursor : pointer;
    transition : .25s all;

    &:hover { 
        opacity : .5;
    }
`;

export const LogoutButtonImg = styled.img `
    height : 15px;
    width : 15px;
    margin : 0 4px 0 0;
`;

export const LogoutButtonText = styled.div `
    color : #a0a0a0;
    font-size : 13px;
    letter-spacing : 1px;
`;