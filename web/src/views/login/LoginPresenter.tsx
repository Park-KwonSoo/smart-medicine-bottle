import React from 'react';

import * as styled from './LoginStyled';

interface LoginProps {
    loginForm : {
        userId : string,
        password : string,
    };
    onSetUserId : React.ChangeEventHandler<HTMLInputElement>;
    onSetPassword : React.ChangeEventHandler<HTMLInputElement>;
    onGoRegister : () => void;
    onLogin : React.MouseEventHandler<HTMLButtonElement>;
}

const LoginPresenter = (props : LoginProps) => {
    return (
        <styled.Container>
            <styled.LoginWrapper>
                <styled.LoginTitle>🩺 로그인</styled.LoginTitle>
                <styled.LoginInputWrapper>
                    <styled.LoginEachInputWrapper>
                        <styled.LoginInputText>
                            이메일
                        </styled.LoginInputText>
                        <styled.LoginInput 
                            type = 'text'
                            value = {props.loginForm.userId}
                            onChange = {props.onSetUserId}
                            placeholder = 'Email'
                        />
                    </styled.LoginEachInputWrapper>
                    <styled.LoginEachInputWrapper>
                        <styled.LoginInputText>
                            비밀번호
                        </styled.LoginInputText>
                        <styled.LoginInput 
                            type = 'password'
                            value = {props.loginForm.password}
                            onChange = {props.onSetPassword}
                            placeholder = 'Password'
                        />
                    </styled.LoginEachInputWrapper>
                </styled.LoginInputWrapper>
                <styled.RegisterButtonWrapper>
                    <styled.RegisterButton
                        onClick = {props.onGoRegister}
                    >
                        회원가입
                    </styled.RegisterButton>
                </styled.RegisterButtonWrapper>
                <styled.LoginButtonWrapper>
                    <styled.LoginButton
                        onClick = {props.onLogin}
                        isLoginButton = {true}
                    >
                        로그인
                    </styled.LoginButton>
                </styled.LoginButtonWrapper>
            </styled.LoginWrapper>
        </styled.Container>
    );
};

export default LoginPresenter;