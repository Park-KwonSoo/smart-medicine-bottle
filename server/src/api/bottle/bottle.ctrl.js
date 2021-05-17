//어플에서 약병 등록 및, 약병에 관한 정보 조회 = 여기서 mqtt통신으로 broker에 데이터를 요청한다.
const Bottle = require('../../models/bottle');
const Hub = require('../../models/hub');
const Medicine = require('../../models/medicine');
const Mqtt = require('../../lib/MqttModule');
const jwt = require('jsonwebtoken');

//약병 등록
exports.bottleConnect = async(ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { bottleId, hubId } = ctx.request.body;

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
    if(hub.getHub_UserId() !== userId) {
        ctx.status = 403;
        return;
    }

    const hosting = hub.getHubHost();
    if(!hosting) {
        ctx.status = 404;
        return;
    }


    const newBottle = new Bottle({
        bottleId,
        hubId
    });

    const client = await Mqtt.mqttOn(hosting);
    const topic = 'bottle/' + newBottle.getBottleId() + '/bts';
    Mqtt.mqttSubscribe(client, topic);

    await newBottle.save();

    ctx.status = 201;
};

//약병 등록 해제
exports.bottleDisconnect = async(ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { bottleId } = ctx.params; 

    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        return;
    } 

    const hub = await Hub.findByHubId(bottle.getHubId());
    if(hub.getHub_UserId() !== userId) {
        ctx.status = 403;
        return;
    }

    const hosting = hub.getHubHost();

    const client = await Mqtt.mqttOn(hosting);
    const topic = 'bottle/' + bottleId + '/bts';
    Mqtt.mqttUnsubscribe(client, topic);

    await Bottle.deleteOne({ bottleId });

    ctx.status = 204;

};

//약병 정보를 조회 -> 약병에 현재 데이터를 요청한다. message : req
exports.lookupInfo = async(ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { bottleId } = ctx.params;

    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        return;
    }

    const hub = await Hub.findByHubId(bottle.getHubId());
    if(hub.getHub_UserId() !== userId) {
        ctx.status = 403;
        return;
    }

    const hosting = hub.getHubHost();
    //서버에서 bottle로 데이터를 요청한다.
    const client = await Mqtt.mqttOn(hosting);
    const topic = 'bottle/' + bottleId + '/stb';
    const message = 'req';
    Mqtt.mqttPublishMessage(client, { topic, message });
    
    ctx.status = 200;
    ctx.body = bottle;
}

//약병의 ID를 찾아서 약의 정보를 등록 : Post
exports.setMedicine = async(ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { bottleId } = ctx.params;
    const { medicineId, dosage } = ctx.request.body;

    const bottle = await Bottle.findByBottleId(bottleId);
    if(!bottle) {
        ctx.status = 404;
        return;
    }

    const hub = await Hub.findByHubId(bottle.getHubId());
    if(hub.getHub_UserId() !== userId) {
        ctx.status = 403;
        return;
    }

    const medicine = await Medicine.findByMedicineId(medicineId);
    if(!medicine) {
        ctx.status = 404;
        return;
    }

    await Bottle.findOneAndUpdate({
        bottleId
    }, { 
        medicineId,
        dosage
     });

    ctx.status = 200;
}

//로그인한 유저의 약병 리스트 가져오기
exports.getBottleList = async(ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token) {
        ctx.status = 401;
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const hubList = await Hub.find({ userId })
    if(!hubList) {
        ctx.status = 404;
        return;
    }

    const bottleList = await getBottleListByHub(hubList);
    if(!bottleList) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
    ctx.body = bottleList;
}

const getBottleListByHub = async (hubList) => {
    const result = []

    for (const hub of hubList) {
        const bottle = await Bottle.find({
            hubId : hub.hubId
        });
        result.push(...bottle)
    }

    return result;
}
