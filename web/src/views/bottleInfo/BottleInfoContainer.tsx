import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import * as recoilUtil from '../../util/recoilUtil';

import HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import BottleInfoPresenter from './BottleInfoPresenter';

import { doctorApi } from '../../api';


type BottleInfoProps = RouteComponentProps

const BottleInfoContainer = (props : BottleInfoProps) => {

    const token = useRecoilValue(recoilUtil.token);
    const userTypeCd = useRecoilValue(recoilUtil.userTypeCd);


    useEffect(() => {
        if(userTypeCd !== 'DOCTOR') {
            props.history.push('/');
        }
    }, [userTypeCd]);

    return (
        <BottleInfoPresenter

        />
    );
};

export default BottleInfoContainer;