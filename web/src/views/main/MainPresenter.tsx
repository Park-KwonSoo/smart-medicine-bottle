import React from 'react';

import * as styled from './MainStyled';


interface MainProps {
    userTypeCd : string;
}

const MainPresenter = (props : MainProps) => {
    return (
        <styled.Container>
            This is Main Page for {props.userTypeCd}
        </styled.Container>
    )
};

export default MainPresenter;