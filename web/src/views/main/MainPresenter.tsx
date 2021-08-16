import React from 'react';

import * as styled from './MainStyled';


interface MainProps {
    userType : string;
}

const MainPresenter = (props : MainProps) => {
    return (
        <styled.Container>
            This is Main Page {props.userType}
        </styled.Container>
    )
};

export default MainPresenter;