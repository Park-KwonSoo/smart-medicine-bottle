import React, { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router-dom';

import { useRecoilValue, useRecoilState } from "recoil";
import * as recoilUtil from '../../util/recoilUtil';

import Header from '../../components/Header';
import RegisterPresenter from "./RegisterPresenter";

import { authApi } from '../../api';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RegisterProps extends RouteComponentProps {}

const RegisterContainer = (props : RegisterProps) => {

    const [token, setToken] = useRecoilState(recoilUtil.token);

    const fetchData = async() => {
        if(token && token.length) {
            const result = await authApi.verifyToken(token);
            if (result.statusText === 'OK') {
                props.history.push('/');
            }
        } 
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
        <Header {...props}/>
        <RegisterPresenter

        />
        </>
    )
};

export default RegisterContainer;