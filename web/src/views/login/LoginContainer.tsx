import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import LoginPresenter from './LoginPresenter';

import { authApi } from 'api';

type LoginProps = RouteComponentProps

const LoginContainer = (props : LoginProps) => {
    return (
        <LoginPresenter
            temp = {'hi'}
        />
    )
};

export default LoginContainer;