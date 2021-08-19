import React from 'react';

import * as styled from './HeaderStyled';

const headerImg = '/static/img/pharmacy.png';


const Header = () => {
    return (
        <styled.Container>
            <styled.HeaderWrapper>
                <styled.TitleImg src = {headerImg} />
                <styled.Title>내 손 안의 주치의</styled.Title>
            </styled.HeaderWrapper>
        </styled.Container>
    )
};

export default Header;