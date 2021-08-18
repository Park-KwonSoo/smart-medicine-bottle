import React from 'react';

import * as styled from './MainStyled';


interface MainProps {
    userTypeCd : string;
}

const MainPresenter = (props : MainProps) => {
    return (
        <styled.Container>
            <styled.InfoAndSearchWrapper>
                <styled.InfoWrapper>
                    <styled.InfoSquare>

                    </styled.InfoSquare>
                    <styled.NewPatientButton>새 환자 등록</styled.NewPatientButton>
                </styled.InfoWrapper>
                <styled.SearchAndDetailWrapper>
                    <styled.SearchBarWrapper>
                        <styled.SearchBar 
                            placeholder = '환자 이름'
                        />
                        <styled.SearchButton>
                            검색
                        </styled.SearchButton>
                    </styled.SearchBarWrapper>
                    <styled.SearchResultWrapper>

                    </styled.SearchResultWrapper>
                </styled.SearchAndDetailWrapper>
            </styled.InfoAndSearchWrapper>
            <styled.BottleListWrapper>
                bottleListWrapper
            </styled.BottleListWrapper>
        </styled.Container>
    )
};

export default MainPresenter;