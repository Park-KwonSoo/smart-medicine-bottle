import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import * as recoilUtil from '../../util/recoilUtil';

import * as Alert from '../../util/alertMessage';

import Header from '../../components/Header';
import LoginPresenter from './LoginPresenter';

import { authApi } from '../../api';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoginProps extends RouteComponentProps {}

const LoginContainer = (props : LoginProps) => {

    const [loginForm, setLoginForm] = useState({
        userId : '',
        password : '',
    });

    const [token, setToken] = useRecoilState(recoilUtil.token);
    const [userId, setUserId] = useRecoilState(recoilUtil.userId);
    const [userTypeCd, setUserTypeCd] = useRecoilState(recoilUtil.userTypeCd);


    const fetchData = async() => {
        if(token && token.length) {
            const result = await authApi.verifyToken(token);
            if (result.statusText === 'OK') {
                props.history.push('/');
            }
        } 
    };

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
            if(result.statusText === 'OK' && result.data.userTypeCd !== 'NORMAL') {
                setToken(result.data.token);
                setUserId(loginForm.userId);
                setUserTypeCd(result.data.userTypeCd);
                Alert.onSuccess('로그인 성공, 메인 화면으로 이동합니다.', () => props.history.push('/'));
            } else if(result.data.userTypeCd === 'NORMAL') {
                Alert.onError('권한이 없는 유저입니다.', () => props.history.push('/'));
            }
        } catch(e : any) {
            Alert.onError(e.response.data.error, () => null);
        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <Header {...props} />
        <LoginPresenter
            loginForm = {loginForm}
            onSetUserId = {onSetUserId}
            onSetPassword = {onSetPassword}
            onGoRegister = {onGoRegister}
            onLogin = {onLogin}
        />
        </>
    )
};

export default LoginContainer;