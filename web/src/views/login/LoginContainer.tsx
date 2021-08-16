import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import * as recoilUtil from '../../util/recoilUtil';

import LoginPresenter from './LoginPresenter';

import { authApi } from '../../api';


type LoginProps = RouteComponentProps

const LoginContainer = (props : LoginProps) => {

    const [loginForm, setLoginForm] = useState({
        userId : '',
        password : '',
    });
    const [token, setToken] = useRecoilState(recoilUtil.token);

    const onSetUserId = (e : React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            userId : e.target.value,
        });
    };

    const onSetPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            password : e.target.value,
        });
    };

    const onLogin = async () => {
        const data : FormData = new FormData();
        data.append('userId', loginForm.userId);
        data.append('password', loginForm.password);

        try {
            const result : any = await authApi.login(data);
            if(result.token) {
                setToken(result.token);
                props.history.push('/');
            }
        } catch(e) {
            console.log(e);
        }

    };

    useEffect(() => {
        console.log('loginPage');
    }, []);

    return (
        <LoginPresenter
            loginForm = {loginForm}
            onSetUserId = {onSetUserId}
            onSetPassword = {onSetPassword}
            onLogin = {onLogin}
        />
    )
};

export default LoginContainer;