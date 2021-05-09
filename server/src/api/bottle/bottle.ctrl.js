//어플에서 약병 등록 및, 약병에 관한 정보 조회 = 여기서 mqtt통신으로 broker에 데이터를 요청한다.
const Bottle = require('../../models/bottle');
const Hub = require('../../models/hub');
const DataProcess = require('../../lib/DataProcess');
const Mqtt = require('../../lib/MqttModule');

exports.bottleRegister = async(ctx) => {
    const { bottleId, hubId, topic } = ctx.request.body;

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

    const client = Mqtt.mqttOn({
        host : hosting.host,
        port : hosting.port,
        clientId : hosting.clientId
    });
    Mqtt.mqttSubscribe(client, topic);

    await newBottle.save();

    ctx.status = 200;
};

exports.lookupInfo = async(ctx) => {
    const { bottleId, topic } = ctx.request.body;
    /** toDO
     * 약병 데이터를 요청한다
     * 1. Broker에 데이터 요청
     * 2. Broker에게서 받은 데이터를
     * 3. 가공한 후
     * 4. 유저에게 http response
     */

    const bottle = await Bottle.findByBottleId(bottleId);
    const hubId = await bottle.getHubId();
    const hub = await Hub.findByHubId(hubId);
    const hosting = await hub.getHubHost();

    const client = await Mqtt.mqttOn({
        host : hosting.host,
        port : hosting.port,
        clientId : hosting.clientId,
    });
    Mqtt.mqttSubscribe(client, topic);

    const a = dataRequest();  //1.
    const b = await getData();
    const c = await dataProcess();

    ctx.body = {
        a,
        b, 
        c
    }
}

//약병의 ID를 찾아서 약의 정보를 등록 : Post
exports.setMedicine = async(ctx) => {
    const { medicineId, bottleId } = ctx.request.body;

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


