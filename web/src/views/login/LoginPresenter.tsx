import React from 'react';

import * as styled from './LoginStyled';

interface LoginProps {
    loginForm : {
        userId : string,
        password : string,
    };
    onSetUserId : React.ChangeEventHandler<HTMLInputElement>;
    onSetPassword : React.ChangeEventHandler<HTMLInputElement>;
    onLogin : React.MouseEventHandler<HTMLButtonElement>;
}

const LoginPresenter = (props : LoginProps) => {
    return (
        <styled.Container>
            <styled.LoginWrapper>
                <styled.LoginInputWrapper>
                    <styled.LoginEachInputWrapper>
                        <styled.LoginInputText
                        >
                            로그인 이메일
                        </styled.LoginInputText>
                        <styled.LoginInput 
                            type = 'text'
                            value = {props.loginForm.userId}
                            onChange = {props.onSetUserId}

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
                        />
                    </styled.LoginEachInputWrapper>
                </styled.LoginInputWrapper>
                <styled.LoginButtonWrapper>
                    <styled.LoginButton
                        onClick = {props.onLogin}
                    >
                        로그인
                    </styled.LoginButton>
                </styled.LoginButtonWrapper>
            </styled.LoginWrapper>
        </styled.Container>
    );
};

export default LoginPresenter;