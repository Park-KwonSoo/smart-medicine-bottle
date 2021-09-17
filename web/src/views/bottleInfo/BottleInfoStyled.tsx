import styled from 'styled-components';


export const Container = styled.div `
    height : 100vh;
    width : 100%;
    display : flex;
    flex-direction : column;
    justify-content : center;
`;

export const MedicineNameWrapper = styled.div `
    border : none;
    border-bottom : 1px solid #ddd;
    width : 100%;

    padding : 4% 0;

    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

export const MedicineName = styled.div `
    font-size : 20px;
    font-weight : 700;
    letter-spacing : 1px;

    color : #337DFF;
`;

export const MedicineInfoWrapper = styled.div `
    flex : 9;
    width : 100%;

    overflow : scroll;
    border : none;

    display : flex;
    flex-direction : column;
    align-items : center;

    padding : 0 0 0 3px;

    &::-webkit-scrollbar {
        width : 3px;
        background-color : transparent;
        height : 0px;
    }

    &::-webkit-scrollbar-thumb {
        background-color : #337DFF;
    }

`;

export const MedicineEachInfoWrapper = styled.div `
    display : flex;
    flex-direction : column;

    width : 80%;
    padding : 20px 10%;
    border : none;
    border-bottom : 1px solid #ddd;
`;

export const MedicineEachInfoTitle = styled.div `
    font-size : 14px;
    font-weight : 500;
    color : #337DFF;
    margin : 0 0 5px 0;
`;

export const MedicineEachInfo = styled.div `
    font-size : 16px;
    letter-spacing : 1px;
`;

export const ChartAndFeedbackWrapper = styled.div `
    flex : 3;
    display : flex;
    flex-direction : row;

    justify-content : space-around;

`;

export const ChartWrapper = styled.div `
    border : 1px solid transparent;
    padding : 10px;

    border-radius : 4px;

    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;

    box-shadow: 0px 0px 10px #a0a0a0;

`;

export const MedicineDetailViewButtonWrapper = styled.div `
    border : none;
    width : 100%;
    
    display : flex;
    flex-direction : row;
    justify-content : flex-end;
    align-items : center;
`;

export const MedicineDetailViewButton = styled.button `
    height : 25px;
    width : 25px;

    display : flex;
    justify-content : center;
    align-items : center;

    background-color : transparent;
    border : 1px solid #ddd;
    border-radius : 3px;

    cursor : pointer;

    box-shadow: 0px 0px 3px 0 #a0a0a0;

    opacity : .7;

    &:hover {
        opacity : 1;
    }
`;

export const MedicineDetailViewButtonImg = styled.img `
    height : 15px;
    width : 15px;
`;

export const FeedbackWrapper = styled.div `
    overflow : scroll;
    border : 1px solid transparent;
    width : 500px;

    max-height : 420px;

    border-radius : 4px;

    box-shadow: 0px 0px 10px #a0a0a0;

    display : flex;
    flex-direction : column;

    align-items : center;

    padding : 0 0 0 3px;

    &::-webkit-scrollbar {
        width : 3px;
        background-color : transparent;
        height : 0px;
    }

    &::-webkit-scrollbar-thumb {
        background-color : #337DFF;
    }
`;

export const FeedbackInfoTitle = styled.div `
    width : 100%;
    text-align : center;

    border : none;
    border-bottom : 2px solid #ddd;

    padding : 10px 0;

    font-size : 17px;
    font-weight : 600;

    background-color : transparent;
`;

export const FeedbackEachItemWrapper = styled.div `
    width : 100%;
    padding : 10px 0;

    border : none;
    border-bottom : 1px solid #ddd;
    
    background-color : transparent;

    display : flex;
    flex-direction : row;
    align-items : center;
`;

export const FeedbackType = styled.div<{fdbType : string}> `
    margin : 0 0 0 10px;

    border : none;
    border-radius : 100px;

    height : 12px;
    width : 12px;


    background-color : ${props => 
        props.fdbType === 'RECOMMEND' ? '#337DFF'
        : props.fdbType === 'CAUTION' ? '#FFE77B'
        : props.fdbType === 'WARN' ? '#FF8941'
        : props.fdbType === 'CRITICAL' ? '#E40000' : 'transparent'
    };
`;

export const FeedbackTitle = styled.div `
    flex : 7;

    height : 100%;

    padding : 0 10px;

    display : flex;
    flex-direction : row;

    align-items : center;

    font-size : 12px;
    font-weight : 500;
`;

export const FeedbackDtm = styled.div `
    flex : 2;

    height : 100%;

    padding : 0 10px;

    display : flex;
    flex-direction : row;

    align-items : center;

    border : none;
    border-left : 1px solid #ddd;

    font-size : 10px;
    font-weight : 400;
`;


export const NewFeedbackRegWrapper = styled.div `
    margin : 20px 10px;

    flex : 2;
    display : flex;
    flex-direction : row;
    justify-content : center;

    padding : 20px;

    border : 1px solid transparent;
    border-radius : 4px;

    box-shadow: 0px 0px 10px #a0a0a0;

`;

export const NewFeedbackRegInput = styled.textarea `
    resize : none;
    flex : 10;

    padding : 30px;

    font-size : 14px;

    border : 1px solid #a0a0a0;
    border-radius : 4px;
`;

export const NewFeedbackButtonWrapper  = styled.div `
    flex : 2;
    border : none;

    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;

    gap : 2%;

`;

export const NewFeedbackTypeButtonWrapper = styled.div `
    flex : 5;
    display : flex;
    flex-direction : column;

    border : none;
    width : 70%;
`;

export const NewFeedbackTypeButtonEachWrapper = styled.div `
    flex : 1;
    display : flex;
    flex-direction : row;
    justify-content : flex-start;
    align-items : center;

    width : 100%;
    padding : 10% 0;

    border : none;
`;

export const NewFeedbackTypeButton = styled.button<{valueType : string, selected : boolean}> `
    height : 15px;
    width : 15px;

    border : 1px solid #ddd;
    border-radius : 3px;
    background-color : ${props => 
        props.selected && props.valueType === 'RECOMMEND' ? '#337DFF'
        : props.selected && props.valueType === 'CAUTION' ? '#FFE77B'
        : props.selected &&  props.valueType === 'WARN' ? '#FF8941'
        : props.selected && props.valueType === 'CRITICAL' ? '#E40000' : 'transparent'
    };

    display : flex;
    justify-content : center;
    align-items : center;

    cursor : pointer;

    margin : 0 5% 0 0;

    transition : .25s all;

    &:hover {
        background-color : ${props => 
            props.valueType === 'RECOMMEND' ? '#337DFF'
            : props.valueType === 'CAUTION' ? '#FFE77B'
            : props.valueType === 'WARN' ? '#FF8941'
            : props.valueType === 'CRITICAL' ? '#E40000' : 'transparent'
        };
    }
`

export const NewFeedbackTypeButtonText = styled.div `
    font-size : 12px;
    font-weight : 500;
    letter-spacing : 1px;
`;

export const NewFeedbackRegButton = styled.button `
    flex : 2;
    width : 70%;

    cursor : pointer;

    border : 1px solid transparent;
    border-radius : 4px;
    background-color : #343434;
    color : #fff;

    transition : .25s all;

    &:hover {
        background-color : transparent;
        border : 1px solid #343434;
        color : #343434;
    }
`;

export const NewFeedbackRegButtonText = styled.div `
    font-size : 15px;
    letter-spacing : 1px;
    font-weight : 600;

    font-color : #fff


`;

export const NewFeedbackRegButtonImg = styled.img `

`;