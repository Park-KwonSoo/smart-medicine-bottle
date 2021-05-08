const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MedicineSchema = new Schema ({
    medicineId : { type : Number, required : true, unique : true },
    name : { type : String, required : true },
    company : String,
    target : { type : String, required : true },
    dosage : { type : String, required : true },
    warn : { type : String, required : true },
    antiEffect : { type : String, required : true }
})

MedicineSchema.statics.findByName = async function(name) {
    const all = await this.find().exec();
    const result = all.filter(item => {
        return item.name.includes(name)
    });

    return result;
};

MedicineSchema.statics.findByCompany = async function(company) {
    const all = await this.find().exec();
    const result = all.filter(item => {
        return item.company.includes(company)
    });

    return result;
};

MedicineSchema.statics.findByTarget = async function(target) {
    const all = await this.find().exec();
    const result = all.filter(item => {
        return item.target.includes(target)
    });

    return result;
};

MedicineSchema.statics.findByMedicineId = function(medicineId) {
    return this.findOne({ medicineId })
};


module.exports = mongoose.model('Medicine', MedicineSchema);