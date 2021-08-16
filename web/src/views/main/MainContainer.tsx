import React, { useState, useEffect } from 'react';
import { RouteComponentProps} from 'react-router-dom';

import MainPresenter from './MainPresenter';

import { useRecoilState, useRecoilValue } from 'recoil';
import * as recoilUtil from '../../util/recoilUtil';

import { doctorApi, managerApi, userApi, authApi } from '../../api';


type MainProps = RouteComponentProps

const MainContainer = (props : MainProps) => {

    const token = useRecoilValue(recoilUtil.token);
    const userType = useRecoilValue(recoilUtil.userType);

    useEffect(() => {
        if(!token || !token.length) {
            props.history.push('/login');
        }
    }, []);

    return (
        <MainPresenter
            userType = {userType}
        />
    );
};

export default MainContainer;