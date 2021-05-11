//어플에서 약병 등록 및, 약병에 관한 정보 조회 = 여기서 mqtt통신으로 broker에 데이터를 요청한다.
const Bottle = require('../../models/bottle');
const Hub = require('../../models/hub');
const Medicine = require('../../models/medicine');
const Mqtt = require('../../lib/MqttModule');

exports.bottleConnect = async(ctx) => {
    const { bottleId, hubId } = ctx.request.body;

    const newBottle = new Bottle({
        bottleId,
        hubId
    });

    const isExistBottle = await Bottle.findByBottleId(bottleId);
    if(isExistBottle) {
        ctx.status = 409;
        return;
    }

    const hub = await Hub.findByHubId(hubId);
    if(!hub) {
        ctx.status = 404;
        return;
    }

    const hosting = await hub.getHubHost();
    if(!hosting) {
        ctx.status = 404;
        return;
    }

    const client = await Mqtt.mqttOn(hosting);
    const topic = 'bottle/' + bottleId + '/bts';
    Mqtt.mqttSubscribe(client, topic);

    await newBottle.save();

    ctx.status = 200;
};

exports.bottleDisconnect = async(ctx) => {
    const { bottleId } = ctx.params; 

    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        return;
    } 

    const hub = await Hub.findByHubId(bottle.getHubId());
    const hosting = await hub.getHubHost();

    const client = await Mqtt.mqttOn(hosting);
    const topic = 'bottle/' + bottleId + '/bts';
    Mqtt.mqttUnsubscribe(client, topic);

    await Bottle.deleteOne({ bottleId });

    ctx.status = 200;

};

exports.lookupInfo = async(ctx) => {
    const { bottleId } = ctx.params;

    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        return;
    }
    
    ctx.status = 200;
    ctx.body = bottle;
}

//약병의 ID를 찾아서 약의 정보를 등록 : Post
exports.setMedicine = async(ctx) => {
    const { bottleId } = ctx.params;
    const { medicineId } = ctx.request.body;

    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        return;
    }

    const medicine = await Medicine.findByMedicineId(medicineId);
    if(!medicine) {
        ctx.status = 404;
        return;
    }

    await Bottle.findOneAndUpdate({
        bottleId
    }, { medicineId });

    ctx.status = 200;
}

const dataRequest = () => {
    return 'dataRequest'
}

const getData = async() => {
    return 'getData'
}

const dataProcess = async() => {
    return 'dataProcess..'
}


