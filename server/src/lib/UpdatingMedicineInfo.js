const axios = require('axios');
const Medicine = require('../models/medicine');

exports.updateMedicineInfo = async() => {
    const itemArray = await getItemsList(getQueryURL);
    await exportJsonData(itemArray);

    console.log('\x1b[1;35mAll of data is updated!\x1b[0m');
}

//queryUrl을 return하는 함수 : 한 페이지에 100개의 item씩 요청할 수 있다.
const getQueryURL = (i) => {
    const url = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList';
    const queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + process.env.SERVICE_KEY;
    const pageNum = '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(i);
    const numOfItem = '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(100);
    const output = '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json');

    return url + queryParams + pageNum + numOfItem + output;
}

//모든 page의 item을 list에 push해서 return하는 함수
const getItemsList = async(queryUrl) => {
    let i = 1, getItem = null, items = null;
    const result = [];
    
    while(true) {
        getItem = await axios.get(queryUrl(i));
        items = getItem.data.body.items;

        if(items === undefined)
            return result;
        
        result.push(...items);
        console.log('\x1b[100mmedicine data getting processing... : page', i, 'done\x1b[0m');
        i++;
    }
}

//itemArray에 있는 모든 data를 MongoDB의 SMB collections에 저장함
const exportJsonData = (itemList) => {
    itemList.forEach(async item => {
        const medicineId = item.itemSeq;
        const medicineInfo = {
            name : item.itemName,
            company : item.entpName,
            target : await slicingInfo(item.efcyQesitm),
            dosage : await slicingInfo(item.useMethodQesitm),
            warn : await slicingInfo(item.atpnWarnQesitm ? 
                item.atpnWarnQesitm + '\n' + item.atpnQesitm
                : item.atpnQesitm),
            antiEffect : await slicingInfo(item.seQesitm)
        };
        
        Medicine.findOneAndUpdate({ 
            medicineId
        }, medicineInfo, {
            upsert : true
        }).exec();
    })
}

//복용 정보에서 불필요한 태그를 제거하고 제거된 값을 반환한다.
const slicingInfo = async (info) => {
    let result = info;
    
    if(info) {
        result = await info.split('<p>').join('')
        .split('</p>').join('')
        .split('<sup>').join('')
        .split('</sup>').join('')
        .split('null').join('');
    }
    
    return result;
}