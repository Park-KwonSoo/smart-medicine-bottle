import React from 'react';

import * as styled from './RegisterStyled';


const RegisterPresenter = () => {
    return (
        <styled.Container>
            <styled.RegisterWrapper>
                <styled.RegisterTitle>회원 가입</styled.RegisterTitle>
                <styled.RegisterInfo>* 의사만 회원가입이 가능합니다.</styled.RegisterInfo>
                <styled.RegisterInfo style = {{fontSize : 10,}}>의사 인증을 위한 정보가 요구됩니다.</styled.RegisterInfo>
                <styled.RegisterInputWrapper>
                    <styled.RegisterInputText>이메일</styled.RegisterInputText>
                    <styled.RegisterInput 
                        placeholder = 'Email'
                    />
                </styled.RegisterInputWrapper>
                <styled.RegisterInputWrapper>
                    <styled.RegisterInputText>비밀번호</styled.RegisterInputText>
                    <styled.RegisterInput 
                        placeholder = 'Password'
                    />
                </styled.RegisterInputWrapper>
                <styled.RegisterInputWrapper>
                    <styled.RegisterInputText>비밀번호 확인</styled.RegisterInputText>
                    <styled.RegisterInput 
                        placeholder = 'Password Again'
                    />
                </styled.RegisterInputWrapper>
            </styled.RegisterWrapper>
        </styled.Container>
    )
};

export default RegisterPresenter;