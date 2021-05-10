//해당하는 약의 정보를 불러오거나, 약을 검색
const Medicine = require('../../models/medicine');

exports.medicineSearch = async(ctx) => {
    const { name, company, target } = ctx.request.body;

    let result = null;
    
    if (name && name !== '' && name !== undefined)
        result = await medicineSearch_ByName(name);
    
    else if (company && company !== '' && company !== undefined)
        result = await medicineSearch_ByCompany(company);

    else if (target && target !== '' && target !== undefined) 
        result = await medicineSearch_ByTarget(target);

    ctx.status = 200;
    ctx.body = {
        totalItem : result.length,
        result
    }
}

//이름으로 약 검색
const medicineSearch_ByName = async(name) => {
    const result = await Medicine.findByName(name);
    return result;
}

//제조사명으로 약 검색
const medicineSearch_ByCompany = async(company) => {
    const result = await Medicine.findByCompany(company);
    return result;
}

//타겟 병명으로 약 검색
const medicineSearch_ByTarget = async(target) => {
    const result = await Medicine.findByTarget(target);
    return result;
}