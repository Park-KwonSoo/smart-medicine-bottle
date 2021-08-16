import React from 'react';

import * as styled from './LoginStyled';

interface LoginProps {
    temp : string;
}

const LoginPresenter = (props : LoginProps) => {
    return (
        <styled.Container>
            This is Login Page {props.temp}
        </styled.Container>
    );
};

export default LoginPresenter;