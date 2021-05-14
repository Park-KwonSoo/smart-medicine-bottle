//약의 정보를 검색하는 API : 약명, 제조사, 효능
const Medicine = require('../../models/medicine');

exports.medicineSearch = async(ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token) {
        ctx.status = 401;
        return;
    }

    const { name, company, target } = ctx.request.body;

    let result = [];
    
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

exports.medicineGet = async(ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token) {
        ctx.status = 401;
        return;
    }

    const { medicineId } = ctx.params;
    const medicine = await Medicine.findByMedicineId(medicineId);
    if(!medicine) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
    ctx.body = medicine;
    
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