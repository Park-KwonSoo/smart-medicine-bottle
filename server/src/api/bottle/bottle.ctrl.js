//어플에서 약병 등록 및, 약병에 관한 정보 조회 = 여기서 mqtt통신으로 broker에 데이터를 요청한다.
const Bottle = require('../../models/bottle')
const DataProcess = require('../../lib/DataProcess');
const MqttModule = require('../../lib/MqttModule');

exports.lookupInfo = async(ctx) => {
    /** toDO
     * 약병 데이터를 요청한다
     * 1. Broker에 데이터 요청
     * 2. Broker에게서 받은 데이터를
     * 3. 가공한 후
     * 4. 유저에게 http response
     */

    const a = dataRequest();  //1.
    const b = await getData();
    const c = await dataProcess();

    ctx.body = {
        a,
        b, 
        c
    }
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


