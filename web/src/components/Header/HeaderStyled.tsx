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

export const HeaderWrapper = styled.div `
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
    flex : 1;
    text-align : center;
    font-size : 17px;
    font-weight : 800;
`;