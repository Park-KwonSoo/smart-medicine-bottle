//해당하는 약의 정보를 불러오거나, 약을 검색
const Medicine = require('../../models/medicine');

exports.medicineSearch = async(ctx) => {
    ctx.body = {
        medicineSearch : 'search..'
    }
}

//이름으로 약 검색
const medicineSearch_ByName = async(name) => {

}

//제조사명으로 약 검색
const medicineSearch_ByCompany = async(company) => {

}

//효능으로 약 검색
const medicineSearch_ByEfficacy = async(efficacy) => {

}

//타겟 병명으로 약 검색
const medicineSearch_ByTarget = async(target) => {

}