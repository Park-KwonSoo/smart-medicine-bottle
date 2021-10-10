import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import * as recoilUtil from '../../util/recoilUtil';
import * as makeChart from '../../util/makeChart';
import * as Alert from '../../util/alertMessage';

import moment from 'moment';

import Header from '../../components/Header';
import BottleInfoPresenter from './BottleInfoPresenter';

import { doctorApi } from '../../api';



interface RouteParmas {
    bottleId : string;
}

type BottleInfoProps = RouteComponentProps<RouteParmas>

const BottleInfoContainer = (props : BottleInfoProps) => {

    const { bottleId } = props.match.params;

    const token = useRecoilValue(recoilUtil.token);
    const userTypeCd = useRecoilValue(recoilUtil.userTypeCd);
    
    const [bottleInfo, setBottleInfo] = useState<any>({
        feedbackList : [],
        medicine : {},
        bottleId : 0,
        takeMedicineHist : [],
    });

    //차트에 표시되는 행의 개수
    const numberOfChartItem = 7;
    const [chartOption, setChartOption] = useState<any>({
        chart : {
            type : 'line',
            height : 300,
            width : 450,
        },
        title : {
            text : '',
            style : { 'color' : '#343434', 'fontSize' : '15px', 'fontWeight' : '700' },
            margin : 10,
        },
        xAxis : {
            categories : [],
        },
        series : [{
            name : '약 복용 회분',
            color : '#337DFF',
            data : [],
        }],
    });
    const [takeMedicineHist, setTakeMedicineHist] = useState<any[]>([]);

    const [feedback, setFeedback] = useState<string>('');
    const [fdbType, setFdbType] = useState<string>('RECOMMEND');

    const [medicineInfoModal, setMedicineInfoModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('hist'); //hist , info


    const fetchData = async () => {
        setModalType('hist');
        setFeedback('');
        setFdbType('RECOMMEND');
        setMedicineInfoModal(false);

        try {
            const result = await doctorApi.getPatientBottleDetail(token, bottleId);
            if (result.statusText === 'OK') {
                setTakeMedicineHist(result.data.takeMedicineHist.map((takeMedicine : any) => {
                    return ({
                        ...takeMedicine,
                        takeDate : moment(takeMedicine.takeDate).format('YYYY년 MM월 DD일 hh시 mm분'),
                    });
                }));
                const { categories, data } = makeChart.make(result.data.takeMedicineHist, numberOfChartItem);
                setBottleInfo({
                    ...result.data,
                    feedbackList : result.data.feedbackList.map((feedback : any) => {
                        return {
                            ...feedback,
                            fdbDtm : moment(feedback.fdbDtm).format('YYYY-MM-DD hh:mm'),
                        }
                    }),
                });
                setChartOption({
                    ...chartOption,
                    title : {
                        text : result.data.medicine.name,
                    },
                    xAxis : {
                        categories,
                    },
                    series : [{
                        data,
                    }]
                });
            } else {
                Alert.onError('접근 권한이 없습니다.', () => props.history.push('/'));
            }
        } catch(e : any) {
            Alert.onError(e.response.data.error, () => props.history.push('/'));

            console.log(e);
        }
    };

    const onSetFeedback = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeedback(e.target.value);
    };

    const onSubmitFeedback = () => {
        const register = async () => {
           if(feedback.length) {
                try {
                    const res = await doctorApi.writeBottleFeedback(token, {
                        bottleId,
                        fdbType,
                        feedback
                    });
                    if(res.statusText === 'OK') {
                        Alert.onSuccess('피드백이 등록되었습니다.', () => fetchData());
                    } else {
                        console.log(res);
                        Alert.onError('피드백 등록에 실패했습니다.', () => null);
                    }
                } catch(e : any) {
                    Alert.onError(e.response.data.error, () => fetchData());
                }
           } else {
               Alert.onError('피드백 내용을 입력하세요.', () => null);
           }
        }
        
        Alert.onCheck('피드백을 등록하시겠습니까?', register, () => null);

    };

    const onViewTakeHist = () => {
        if(modalType === 'info')    setModalType('hist');
    };

    const onViewMedicineInfo = () => {
        if(modalType === 'hist')    setModalType('info');
    };

 
    useEffect(() => {
        if(userTypeCd !== 'DOCTOR') {
            Alert.onError('접근 권한이 없습니다.', () => props.history.push('/'));
        }
        fetchData();
    }, [userTypeCd]);

    return (
        <>
        <Header {...props} />
        <BottleInfoPresenter
            bottleInfo = {bottleInfo}
            chartOption = {chartOption}
            takeMedicineHist = {takeMedicineHist}

            medicineInfoModal = {medicineInfoModal}
            modalType = {modalType}
            onViewTakeHist = {onViewTakeHist}
            onViewMedicineInfo = {onViewMedicineInfo}
            setMedicineInfoModal = {setMedicineInfoModal}

            feedback = {feedback}
            onSetFeedback = {onSetFeedback}
            fdbType = {fdbType}
            setFdbType = {setFdbType}
            onSubmitFeedback = {onSubmitFeedback}


        />
        </>
    );
};

export default BottleInfoContainer;