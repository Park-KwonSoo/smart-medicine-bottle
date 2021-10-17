import React, { useState, useEffect } from 'react';
import { RouteComponentProps} from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import * as recoilUtil from '../../util/recoilUtil';


import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DoctorMenuContainer from './doctor';
import ManagerMenuContainer from './manager';


type MainProps = RouteComponentProps

const MainContainer = (props : MainProps) => {

    const token = useRecoilValue(recoilUtil.token);
    const userTypeCd = useRecoilValue(recoilUtil.userTypeCd);

    useEffect(() => {
        if(!token || !token.length) {
            props.history.push('/login');
        }
    }, []);

    return (
        <>
        <Header {...props}/>
        {
            userTypeCd === 'DOCTOR' ?
            <DoctorMenuContainer {...props}/> :
            userTypeCd === 'MANAGER' ?
            <ManagerMenuContainer {...props}/> : null
        }
        <Footer/>
        </>
    );
};

export default MainContainer;