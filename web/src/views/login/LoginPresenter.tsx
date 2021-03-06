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
                <styled.LoginTitle>๐ฉบ ๋ก๊ทธ์ธ</styled.LoginTitle>
                <styled.LoginInputWrapper>
                    <styled.LoginEachInputWrapper>
                        <styled.LoginInputText>
                            ์ด๋ฉ์ผ
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
                            ๋น๋ฐ๋ฒํธ
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
                        ํ์๊ฐ์
                    </styled.RegisterButton>
                </styled.RegisterButtonWrapper>
                <styled.LoginButtonWrapper>
                    <styled.LoginButton
                        onClick = {props.onLogin}
                        isLoginButton = {true}
                    >
                        ๋ก๊ทธ์ธ
                    </styled.LoginButton>
                </styled.LoginButtonWrapper>
            </styled.LoginWrapper>
        </styled.Container>
    );
};

export default LoginPresenter;