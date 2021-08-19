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
    const [userTypeCd, setUserTypeCd] = useRecoilState(recoilUtil.userTypeCd);
    const [error, setError] = useRecoilState(recoilUtil.error);

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

    const onGoRegister = () => {
        props.history.push('/register');
    };

    const onLogin = async () => {
        try {
            const result : any = await authApi.login(loginForm);
            if(result.statusText === 'OK') {
                setToken(result.data.token);
                setUserTypeCd(result.data.userTypeCd);
                props.history.push('/');
            }
        } catch(e) {
            setError('로그인에 실패했습니다.');
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
            onGoRegister = {onGoRegister}
            onLogin = {onLogin}
        />
    )
};

export default LoginContainer;