import React from 'react';

import * as styled from './MainStyled';


interface MainProps {
    temp : string;
}

const MainPresenter = (props : MainProps) => {
    return (
        <styled.Container>
            This is Main Page {props.temp}
        </styled.Container>
    )
};

export default MainPresenter;