import moment from 'moment';

export const make = (takeMedicineHist : any[], numberOfRow : number) => {
    const now = new Date();
    const result : any = {};
    new Array(numberOfRow).fill(null).forEach(() => {
        const key = moment(now).format('MM/DD');
        result[key] = 0;
        now.setDate(now.getDate() - 1);
    });

    takeMedicineHist.forEach((data : any) => {
        const key : string = moment(data.takeDate).format('MM/DD');
        !isNaN(result[key]) ? result[key] = result[key] + data.dosage : null;
    });

    const categories : any = [];
    const data : any = [];

    Object.entries(result).forEach((item : any) => {
        categories.push(item[0]);
        data.push(item[1]);
    });

    categories.reverse();
    data.reverse();

    return {
        categories,
        data,
    };
};