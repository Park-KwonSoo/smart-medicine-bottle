import React from 'react';
import HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Modal from '../../components/Modal';
import * as styled from './BottleInfoStyled';

const plus = '/static/img/plus.png';


interface BottleInfoProps {
    bottleInfo : {
        feedbackList : any[];
        medicine : any;
        bottleId : number;
        takeMedicineHist : any[];
    };
    chartOption : any;
    takeMedicineHist : any[];

    medicineInfoModal : boolean;
    modalType : string;
    onViewTakeHist : () => void;
    onViewMedicineInfo : () => void;
    setMedicineInfoModal : (arg0 : boolean) => void;

    feedback : string;
    onSetFeedback : React.ChangeEventHandler<HTMLTextAreaElement>;
    fdbType : string;
    setFdbType : (arg0 : string) => void;
    onSubmitFeedback : () => void;
}

const BottleInfoPresenter = (props : BottleInfoProps) => {
    return (
        <styled.Container>
            {
                props.medicineInfoModal ?
                <Modal onModalClose = {() => props.setMedicineInfoModal(false)}>
                <>
                    <styled.ModalTypeButtonWrapper>
                        <styled.ModalTypeButton
                            isSelect = {props.modalType === 'hist'}
                            onClick = {props.onViewTakeHist}
                        >
                            복용 기록
                        </styled.ModalTypeButton>
                        <styled.ModalTypeButton
                            isSelect = {props.modalType === 'info'}
                            onClick = {props.onViewMedicineInfo}
                        >
                            약 정보
                        </styled.ModalTypeButton>
                    </styled.ModalTypeButtonWrapper>
                    {
                        props.modalType === 'hist' ?
                        <>
                        <styled.MedicineNameWrapper>
                            <styled.MedicineName>{`복용 기록`}</styled.MedicineName>
                            <styled.MedicineName style = {{color : '#343434', fontSize : 15, marginTop : 4,}}>{`전체 : ${props.takeMedicineHist.length}건`}</styled.MedicineName>
                        </styled.MedicineNameWrapper>
                        <styled.MedicineInfoWrapper>
                        {
                            props.takeMedicineHist.map((hist : any) => {
                                return (
                                    <styled.HistWrapper
                                        key = {hist._id}
                                    >
                                        <styled.HistDtmWrapper>
                                            <styled.HistInfoEachWrapper style = {{fontSize : 11}}>복용 날짜</styled.HistInfoEachWrapper>
                                            <styled.HistDtm>{hist.takeDate}</styled.HistDtm>
                                        </styled.HistDtmWrapper>
                                        <styled.HistInfoWrapper>
                                            <styled.HistInfoEachWrapper>
                                                약병 내 온도
                                                <styled.HistInfoEach>{hist.temperature}℃</styled.HistInfoEach>
                                            </styled.HistInfoEachWrapper>
                                            <styled.HistInfoEachWrapper>
                                                약병 내 습도
                                                <styled.HistInfoEach>{hist.humidity}%</styled.HistInfoEach>
                                            </styled.HistInfoEachWrapper>
                                            <styled.HistInfoEachWrapper>
                                                약병 내 잔량
                                                <styled.HistInfoEach>{hist.balance}%</styled.HistInfoEach>
                                            </styled.HistInfoEachWrapper>
                                        </styled.HistInfoWrapper>
                                    </styled.HistWrapper>
                                )
                            })
                        }
                        </styled.MedicineInfoWrapper>
                        </> :
                        <>
                        <styled.MedicineNameWrapper>
                            <styled.MedicineName>{props.bottleInfo.medicine.name}</styled.MedicineName>
                            <styled.MedicineName style = {{color : '#343434', fontSize : 15, marginTop : 4,}}>{props.bottleInfo.medicine.company}</styled.MedicineName>
                        </styled.MedicineNameWrapper>
                        <styled.MedicineInfoWrapper>
                            <styled.MedicineEachInfoWrapper>
                                <styled.MedicineEachInfoTitle>효능</styled.MedicineEachInfoTitle>
                                <styled.MedicineEachInfo>{props.bottleInfo.medicine.target}</styled.MedicineEachInfo>
                            </styled.MedicineEachInfoWrapper>
                            <styled.MedicineEachInfoWrapper>
                                <styled.MedicineEachInfoTitle>복용 정보</styled.MedicineEachInfoTitle>
                                <styled.MedicineEachInfo>{props.bottleInfo.medicine.dosage}</styled.MedicineEachInfo>
                            </styled.MedicineEachInfoWrapper>
                            <styled.MedicineEachInfoWrapper>
                                <styled.MedicineEachInfoTitle style = {{color : '#FF3F3F', fontWeight : 'bold'}}>주의 사항</styled.MedicineEachInfoTitle>
                                <styled.MedicineEachInfo style = {{color : '#9B0000'}}>{props.bottleInfo.medicine.warn}</styled.MedicineEachInfo>
                            </styled.MedicineEachInfoWrapper>
                            <styled.MedicineEachInfoWrapper>
                                <styled.MedicineEachInfoTitle style = {{color : '#FF3F3F', fontWeight : 'bold'}}>부작용</styled.MedicineEachInfoTitle>
                                <styled.MedicineEachInfo style = {{color : '#9B0000'}}>{props.bottleInfo.medicine.antiEffect}</styled.MedicineEachInfo>
                            </styled.MedicineEachInfoWrapper>
                        </styled.MedicineInfoWrapper>
                        </>
                    }
                </>
                </Modal> : null
            }
            <styled.ChartAndFeedbackWrapper>
                <styled.ChartWrapper>
                    <styled.MedicineDetailViewButtonWrapper>
                        <styled.MedicineDetailViewButton
                            onClick = {() => props.setMedicineInfoModal(true)}
                        >
                            <styled.MedicineDetailViewButtonImg src = {plus}/>
                        </styled.MedicineDetailViewButton>
                    </styled.MedicineDetailViewButtonWrapper>
                    <HighchartsReact 
                        highCharts = {HighCharts}
                        options = {props.chartOption}
                    />
                </styled.ChartWrapper>
                <styled.FeedbackWrapper>
                    <styled.FeedbackInfoTitle>피드백 내역</styled.FeedbackInfoTitle>
                    {
                        props.bottleInfo.feedbackList.map((feedback : any) => {
                            return (
                                <styled.FeedbackEachItemWrapper
                                    key = {feedback._id}
                                >
                                    <styled.FeedbackType fdbType = {feedback.fdbType}/>
                                    <styled.FeedbackTitle>{feedback.feedback}</styled.FeedbackTitle>
                                    <styled.FeedbackDtm>등록일<br/>{feedback.fdbDtm}</styled.FeedbackDtm>
                                </styled.FeedbackEachItemWrapper>
                            )
                        })
                    }
                </styled.FeedbackWrapper>
            </styled.ChartAndFeedbackWrapper>
            <styled.NewFeedbackRegWrapper>
                <styled.NewFeedbackRegInput 
                    value = {props.feedback}
                    onChange = {props.onSetFeedback}
                />
                <styled.NewFeedbackButtonWrapper>
                    <styled.NewFeedbackTypeButtonWrapper>
                       <styled.NewFeedbackTypeButtonEachWrapper>
                            <styled.NewFeedbackTypeButton 
                                valueType = 'RECOMMEND'
                                selected = {props.fdbType === 'RECOMMEND'}
                                onClick = {() => props.setFdbType('RECOMMEND')}
                            />
                            <styled.NewFeedbackTypeButtonText>권고</styled.NewFeedbackTypeButtonText>
                        </styled.NewFeedbackTypeButtonEachWrapper>
                        <styled.NewFeedbackTypeButtonEachWrapper>
                            <styled.NewFeedbackTypeButton 
                                valueType = 'CAUTION'
                                selected = {props.fdbType === 'CAUTION'}
                                onClick = {() => props.setFdbType('CAUTION')}
                            />
                            <styled.NewFeedbackTypeButtonText>주의</styled.NewFeedbackTypeButtonText>
                        </styled.NewFeedbackTypeButtonEachWrapper> 
                        <styled.NewFeedbackTypeButtonEachWrapper>
                            <styled.NewFeedbackTypeButton 
                                valueType = 'WARN'
                                selected = {props.fdbType === 'WARN'}
                                onClick = {() => props.setFdbType('WARN')}
                            />
                            <styled.NewFeedbackTypeButtonText>경고</styled.NewFeedbackTypeButtonText>
                        </styled.NewFeedbackTypeButtonEachWrapper> 
                        <styled.NewFeedbackTypeButtonEachWrapper>
                            <styled.NewFeedbackTypeButton
                                valueType = 'CRITICAL'
                                selected = {props.fdbType === 'CRITICAL'}
                                onClick = {() => props.setFdbType('CRITICAL')}
                            />
                            <styled.NewFeedbackTypeButtonText>치명</styled.NewFeedbackTypeButtonText>
                        </styled.NewFeedbackTypeButtonEachWrapper> 
                    </styled.NewFeedbackTypeButtonWrapper>
                    <styled.NewFeedbackRegButton
                        onClick = {props.onSubmitFeedback}
                    >
                        <styled.NewFeedbackRegButtonText>피드백<br/>등록</styled.NewFeedbackRegButtonText>
                    </styled.NewFeedbackRegButton>
                </styled.NewFeedbackButtonWrapper>
            </styled.NewFeedbackRegWrapper>
        </styled.Container>
    );
};

export default BottleInfoPresenter;