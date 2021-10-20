import React from 'react';
import { RouteComponentProps } from 'react-router';

import * as Alert from '../../util/alertMessage';
import * as styled from './FooterStyled';


const ApiLicense = '/static/img/apiLicense.png';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FooterProps extends RouteComponentProps {}


const Footer = (props : FooterProps) => {


    const onGoTerm = () => {
        Alert.onWarning('준비중입니다.', () => null);
    };

    const onGoPrivateLicense = () => {
        Alert.onWarning('준비중입니다.', () => null);
    };

    const onGoServiceCenter = () => {
        Alert.onWarning('준비중입니다.', () => null);
    };

    return (
        <styled.Container>
            <styled.TermsWrapper>
                <styled.EachTerms
                    onClick = {onGoTerm}
                >
                    이용약관
                </styled.EachTerms>
                <styled.EachTerms
                    onClick = {onGoPrivateLicense}
                >
                    개인정보처리방침
                </styled.EachTerms>
                <styled.EachTerms
                    onClick = {onGoServiceCenter}
                >
                    고객센터
                </styled.EachTerms>
            </styled.TermsWrapper>
            <styled.InfoWrapper>
                <styled.LicenseWrapper>
                    <styled.LicenseExplain>저작권</styled.LicenseExplain>
                    <styled.LicenseImg src = {ApiLicense}/>
                </styled.LicenseWrapper>
                <styled.ServiceInfoWrapper>
                    <styled.ServiceInfoEach>서비스명 : Smart Medicine Box (SMB)</styled.ServiceInfoEach>
                    <styled.ServiceInfoEach>서비스제공 : IoT 약병 제작회</styled.ServiceInfoEach>
                    <styled.ServiceInfoEach>담당자 : 박권수</styled.ServiceInfoEach>
                    <styled.ServiceInfoEach>주소 : OOO도 OOO시 OOO구 OOO OOO OOO</styled.ServiceInfoEach>
                    <styled.ServiceInfoEach>연락처 : 010 - 0000 - 0000</styled.ServiceInfoEach>
                </styled.ServiceInfoWrapper>
                <styled.LicenseWrapper/>
            </styled.InfoWrapper>
        </styled.Container>
    )
};

export default Footer;