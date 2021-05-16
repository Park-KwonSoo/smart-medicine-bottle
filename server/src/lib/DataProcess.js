const Bottle = require('../models/bottle');

//message subscribe 후 message를 가공한 이후 해당 데이터를 보낼 topic과 message를 리턴하는 함수
exports.dataPublish = async (topic, message) => {
    //client가 subscribe를 하면 메시지를 보낸 약병의 topic과 message를 가공 및 보낸 약병의 bottleId를 가져옴
    const data = await factoring(topic, message);
    const { bottleId } = data;

    //가공된 데이터를 bottleId의 약병에 업데이트
    await bottleInfoUpdate(data);
    //가공된 데이터를 메시지로 만들어 topic과 message 리턴
    const result = await transPublishingTopicAndMessage(bottleId);

    return result;
};

//Hub topic : bottle/bottleId
//Hub로부터 받은 message : 개폐여부/온도/습도/초음파센서
const factoring = (topic, message) => {
    const bottleId = parseInt(topic.split('/')[1]);
    const data = message.split('/');
    const [isOpen, temperature, humidity, balance] = data;

    const openDate = new Date();
    
    return {
        bottleId,
        isOpen,
        openDate,
        temperature,
        humidity,
        balance
    };
}

//bottleId가 포함된 data를 받아서 해당 약병의 data를 업데이트한다.
const bottleInfoUpdate = async(data) => {
    const { bottleId, isOpen, openDate, temperature, humidity, balance } = data;
    if(isOpen === '1') {
        await Bottle.findOneAndUpdate({
            bottleId
        }, { recentOpen : openDate });
    }

    await Bottle.findOneAndUpdate({
        bottleId
    }, {
        temperature,
        humidity,
        balance
    });
}

//해당 MQTT Broker(client)에 bottleId의 정보에 관한 topic과 message를 리턴한다.
const transPublishingTopicAndMessage = async(bottleId) => {
    const topic = 'bottle/' + bottleId + '/stb';
    
    const bottle = await Bottle.findByBottleId(bottleId);
    const recentOpen = bottle.getRecentOpenDate();
    const dosage = bottle.getDosage();

    const message = 'res/' + await transDate(recentOpen) + '/' + dosage;
   
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