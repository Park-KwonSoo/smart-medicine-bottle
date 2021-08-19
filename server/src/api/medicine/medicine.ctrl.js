//약의 정보를 검색하는 API : 약명, 제조사, 효능
const Medicine = require('../../models/medicine');

exports.medicineSearch = async(ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    const { keyword } = ctx.request.body;

    const medicineList = await Medicine.findByKeyword(keyword);

    ctx.status = 200;
    ctx.body = {
        medicineList,
    };
}

exports.medicineGet = async(ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
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
    ctx.body = {
        medicine,
    };
    
}