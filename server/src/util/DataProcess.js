const BottleMedicine = require('../models/bottleMedicine');
const TakeMedicineHist = require('../models/takeMedicineHistory');


//message subscribe 후 message를 가공한 이후 해당 데이터를 보낼 topic과 message를 리턴하는 함수
exports.dataPublish = async (topic, message) => {
    if(message.includes('weight')) {
        console.log('무게 갱신중');
        //무게 갱신
        const result = await updateBottleMedicineWeight(topic, message);

        return result;

    } else {
         //client가 subscribe를 하면 메시지를 보낸 약병의 topic과 message를 가공 및 보낸 약병의 bottleId를 가져옴
        const data = await factoring(topic, message);
        //가공된 데이터를 bottleId의 약병에 업데이트
        await bottleInfoUpdate(data);
        //가공된 데이터를 메시지로 만들어 topic과 message 리턴
        const result = await transPublishingTopicAndMessage(data.bottleId);

        return result;

    }
};

//Hub topic : bottle/bottleId
//Hub로부터 받은 message : 개폐여부/온도/습도/무게센서
const factoring = async (topic, message) => {
    const bottleId = parseInt(topic.split('/')[1]);
    const data = message.split('/');
    const [isOpen, humidity, totalWeight, temperature] = data;

    return {
        bottleId,
        isOpen,
        temperature,    
        humidity,
        totalWeight,
    };

}

//bottleId가 포함된 data를 받아서 해당 약병의 data를 업데이트한다.
const bottleInfoUpdate = async(data) => {
    let { bottleId, isOpen, temperature, humidity, totalWeight } = data;

    bottleId = parseInt(bottleId);
    isOpen = parseInt(isOpen);
    temperature = parseFloat(temperature).toFixed(1);
    humidity = parseFloat(humidity).toFixed(1);
    totalWeight = parseFloat(totalWeight).toFixed(2);

    const bottleMedicine = await BottleMedicine.findOne({ bottleId, useYn : 'Y' });

    if(bottleMedicine) {
        const lastTotalWeight = parseFloat(bottleMedicine.totalWeight);

        if(isOpen) {
            const { eachWeight } = bottleMedicine;
            const dosage = Math.round((lastTotalWeight - totalWeight) / parseFloat(eachWeight));

            const takeMedicineHist  = new TakeMedicineHist({
                bmId : bottleMedicine._id,
                temperature,
                humidity,
                dosage,
            });
            await takeMedicineHist.save();
        }

        await bottleMedicine.setTotalWeight(totalWeight);
        await bottleMedicine.save();
    }
}

//해당 MQTT Broker(client)에 bottleId의 정보에 관한 topic과 message를 리턴한다.
const transPublishingTopicAndMessage = async(bottleId) => {
    const topic = 'bottle/' + bottleId + '/stb';

    const bottleMedicine = await BottleMedicine.findOne({ bottleId, useYn : 'Y' });
    const takeMedicineHistList = await TakeMedicineHist.find({ 
        bmId : bottleMedicine._id 
    }).sort({ takeDate : 'desc' }).limit(1);

    const message = 'res/' + await transDate(takeMedicineHistList[0].takeDate) + '/' + takeMedicineHistList[0].dosage;
   
    return {
        topic,
        message
    };
}

//날짜를 mmdd로 변환해주는 함수
const transDate = (date) => {
    return (date.getMonth() + 1 < 10 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1))
    + (date.getDate() < 10 ? '0' + String(date.getDate()) : String(date.getDate()));
};


//무게센서를 이용하여 데이터값을 갱신하는 함수
const updateBottleMedicineWeight = async (topic, message) => {
    const bottleId = parseInt(topic.split('/')[1]);
    //message = weight/무게
    const totalWeight = parseFloat(message.split('/')[1]);

    const bottleMedicine = await BottleMedicine.findOne({ bottleId, useYn : 'Y' });
    const totalDosage = parseInt(bottleMedicine.totalDosage);
    //받은 값으로 총 무게를 설정한 이후, 총 무게 / 총 복용량으로 개별 무게를 설정한다.
    await bottleMedicine.setTotalWeight(totalWeight);
    await bottleMedicine.setEachWeight(totalWeight / totalDosage);

    await bottleMedicine.save();

    return null;

};