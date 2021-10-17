import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import { useRecoilState } from 'recoil';
import * as recoilUtil from '../../util/recoilUtil';

import * as Alert from '../../util/alertMessage';
import * as styled from './HeaderStyled';

import { authApi } from '../../api';

const headerImg = '/static/img/pharmacy.png';
const backButtonBlue = '/static/img/backButtonBlue.png';
const logout = '/static/img/logout.png';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps extends RouteComponentProps {}

const Header = (props : HeaderProps) => {

    const [token, setToken] = useRecoilState(recoilUtil.token);


    const onLogout = () => {
        const logout = async () => {
            try {
                await authApi.logout();
                setToken(null);
                Alert.onSuccess('로그인 페이지로 이동합니다.', () => props.history.push('/login'));
            } catch(e) {
                Alert.onError('알 수 없는 에러가 발생했습니다.', () => props.history.push('/'));
            }
        };

        Alert.onCheck('정말 로그아웃 하시겠습니까?', logout, () => null);
    };

    const verifyToken = async () => {
        try {
            const result = await authApi.verifyToken(token);
            if(result.statusText !== 'OK') {
                setToken(null);
                Alert.onError('세션이 만료되었습니다. 다시 로그인하세요.', () => props.history.push('/login'));
            }
        } catch(e) {
            console.log(e);
            setToken(null);
            Alert.onError('세션이 만료되었습니다. 다시 로그인하세요.', () => props.history.push('/login'));
        }
    };

    const onGoBack = () => {
        props.history.goBack();
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <styled.Container>
            <styled.HeaderLeftWrapper>
            {
                (token && token.length && props.location.pathname !== '/') ?
                <styled.Backbutton
                    onClick = {onGoBack}
                >
                    <styled.BackbuttonImg src = {backButtonBlue}/>
                    <styled.BackbuttonText>뒤로 가기</styled.BackbuttonText>
                </styled.Backbutton> : null
            }
            </styled.HeaderLeftWrapper>
            <styled.HeaderCenterWrapper>
                <styled.TitleImg src = {headerImg} />
                <styled.Title>SMART MEDICINE BOX for Doctor</styled.Title>
            </styled.HeaderCenterWrapper>
            <styled.HeaderRightWrapper>
            {
                token && token.length ?
                <styled.LogoutButton
                    onClick = {onLogout}
                >
                    <styled.LogoutButtonImg src = {logout}/>
                    <styled.LogoutButtonText>로그아웃</styled.LogoutButtonText>
                </styled.LogoutButton> : null
            }
            </styled.HeaderRightWrapper>
        </styled.Container>
    )
};

export default Header;