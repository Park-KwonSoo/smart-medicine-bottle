import styled from 'styled-components';

export const Container = styled.div `
    height : 100vh;
    width : 100%;
    display : flex;
    flex-direction : column;
    justify-content : center;
`;

export const InfoAndSearchWrapper = styled.div `
    flex : 3;
    display : flex;
    flex-direction : row;

    margin : 0 0 30px 0;
`;

export const InfoWrapper = styled.div `
    flex : 2;

    display : flex;
    flex-direction : column;
    padding : 10px;
`;

export const InfoSquare = styled.div `
    border : 1px solid #ddd;
    border-radius : 5px;

    background-color : transparent;
    flex : 10;

    margin : 0 0 20px 0;

    box-shadow: 0px 0px 5px #a0a0a0;

`;

export const NewPatientButton = styled.button `
    flex : 1;
    border : 1px solid #ddd;
    background-color : transparent;
    border-radius : 3px;

    padding : 10px 30px;

    transition : .25s all;
    color : #343434;

    cursor : pointer;

    &:hover { 
        background-color : #343434;
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
    justify-content : space-between;

    margin : 0 0 10px 0;

`;

export const SearchBar = styled.input `
    border : none;
    border-bottom : 2px solid #ddd;
    width : 80%;
    margin : 0 0 0 20px;
    padding : 10px 0px;
`;

export const SearchButton = styled.button `
    border : 1px solid #ddd;

    background-color : transparent;

    height : 50px;
    width : 50px;

    transition : .25s all;

    cursor : pointer;

    &:hover {
        color : #fff;
        background-color : #343434;
    }
`;

export const SearchResultWrapper = styled.div `
    flex : 5;
    border : 1px solid #ddd;
    border-radius : 3px;
    background-color : transparent;

`;

export const BottleListWrapper = styled.div `
    flex : 2;
    display : flex;
    flex-direction : row;

    background-color : #ddd;
    margin : 0 0 10px 0;
`;