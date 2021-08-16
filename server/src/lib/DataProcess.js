const Bottle = require('../models/bottle');
const BottleMedicine = require('../models/bottleMedicine');
const TakeMedicineHist = require('../models/takeMedicineHistory');

//message subscribe 후 message를 가공한 이후 해당 데이터를 보낼 topic과 message를 리턴하는 함수
exports.dataPublish = async (topic, message) => {
    //client가 subscribe를 하면 메시지를 보낸 약병의 topic과 message를 가공 및 보낸 약병의 bottleId를 가져옴
    const data = await factoring(topic, message);
    //가공된 데이터를 bottleId의 약병에 업데이트
    await bottleInfoUpdate(data);
    //가공된 데이터를 메시지로 만들어 topic과 message 리턴
    const result = await transPublishingTopicAndMessage(data.bottleId);

    return result;

};

//Hub topic : bottle/bottleId
//Hub로부터 받은 message : 개폐여부/온도/습도/초음파센서
const factoring = async (topic, message) => {
    const bottleId = parseInt(topic.split('/')[1]);
    const data = message.split('/');
    let [isOpen, temperature, humidity, balance] = data;

    if(isOpen === '0')
        balance = await balanceFactoring(balance);
    else    balance = '-1';
    
    return {
        bottleId,
        isOpen,
        openDate : new Date(),
        temperature,
        humidity,
        balance
    };

}

const balanceFactoring = (balance) => {
    const max = 10; //Digital Lead Sensor Maximum Value
    const slicingBalance = max / 5;

    if(parseInt(balance) < slicingBalance || parseInt(balance) > max * 2)
        return '80';
    else if(parseInt(balance) < slicingBalance * 2)
        return '60';
    else if(parseInt(balance) < slicingBalance * 3)
        return '40';
    else if(parseInt(balance) < slicingBalance * 4)
        return '20';
    else return '0';

}

//bottleId가 포함된 data를 받아서 해당 약병의 data를 업데이트한다.
const bottleInfoUpdate = async(data) => {
    let { bottleId, isOpen, openDate, temperature, humidity, balance } = data;

    bottleId = parseInt(bottleId);
    isOpen = parseInt(isOpen);
    temperature = parseFloat(temperature);
    humidity = parseFloat(humidity);
    balance = parseInt(balance);

    const bottleMedicine = await BottleMedicine.find({ bottleId }).sort((a, b) => a.regDtm < b.regDtm)[0];

    if(bottleMedicine) {
        if(isOpen) {
            const takeMedicineHist  = new TakeMedicineHist({
                takeDate : openDate,
                bmId : bottleMedicine._id,
                temperature,
                humidity,
                balance,
            });
            takeMedicineHist.save();
        }
    }
}

//해당 MQTT Broker(client)에 bottleId의 정보에 관한 topic과 message를 리턴한다.
const transPublishingTopicAndMessage = async(bottleId) => {
    const topic = 'bottle/' + bottleId + '/stb';

    const bottleMedicine = await BottleMedicine.find({ bottleId }).sort((a, b) => a.regDtm < b.regDtm)[0];
    const takeMedicineHist = await TakeMedicineHist.find({ 
        bmId : bottleMedicine._id 
    }).sort((a, b) => a.takeDate < b.takeDate)[0];

    const message = 'res/' + await transDate(takeMedicineHist.takeDate) + '/' + bottleMedicine.dosage;
   
    return {
        topic,
        message
    };
}

//날짜를 mmdd로 변환해주는 함수
const transDate = (date) => {
    return (date.getMonth() + 1 < 10 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1))
    + (date.getDate() < 10 ? '0' + String(date.getDate()) : String(date.getDate()));
}