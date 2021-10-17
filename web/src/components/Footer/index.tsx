import React from 'react';
import * as styled from './FooterStyled';

const ApiLicense = '/static/img/apiLicense.png';


const Footer = () => {
    return (
        <styled.Container>
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