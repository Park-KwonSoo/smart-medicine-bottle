const Bottle = require('../models/bottle');

//Hub topic : bottle/bottleId
//Hub로부터 받은 message : 개폐여부/온도/습도/초음파센서
exports.factoring = (topic, message) => {
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
exports.bottleInfoUpdate = async(data) => {
    const { bottleId, isOpen, openDate, temperature, humidity, balance } = data;
    if(isOpen === '1') {
        await Bottle.findOneAndUpdate({
            bottleId
        }, { recentOpen : openDate }, {
            new : true
        });
    }

    await Bottle.findByIdAndUpdate({
        bottleId
    }, {
        temperature,
        humidity,
        balance
    }, { new : true });
}

//해당 MQTT Broker(client)에 bottleId의 정보에 관한 message를 발행한다.
exports.dataPublishing = async(client, bottleId) => {
    const topic = 'bottle/'.concat(bottleId);
    
    const bottle = await Bottle.findByBottleId(bottleId);
    const recentOpen = await bottle.getRecentOpenDate();

    const message = await transDate(recentOpen);
   
    client.publish(topic, message, () => {
        console.log('topic : ', topic, 'message : ', message);
    })
}

//날짜를 yymmdd로 변환해주는 함수
const transDate = (date) => {
    return String(date.getFullYear()).substr(2, 2)
    + (date.getMonth() + 1 < 10 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1))
    + (date.getDate() < 10 ? '0' + String(date.getDate()) : String(date.getDate()));
}