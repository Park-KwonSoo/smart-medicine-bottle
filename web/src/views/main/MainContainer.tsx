import React, { useState, useEffect } from 'react';
import { RouteComponentProps} from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import * as recoilUtil from '../../util/recoilUtil';

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
        userTypeCd === 'DOCTOR' ?
        <DoctorMenuContainer {...props}/> :
        <ManagerMenuContainer {...props}/>
    );
};

export default MainContainer;