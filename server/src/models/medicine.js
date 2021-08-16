const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MedicineSchema = new Schema ({
    medicineId : { type : Number, required : true, unique : true },
    name : { type : String, required : true },
    company : { type : String, required : true },
    target : { type : String, required : true },
    dosageInfo : { type : String, required : true },
    warn : { type : String, required : true },
    antiEffect : { type : String, required : true }
})

MedicineSchema.statics.findByKeyword = function(keyword) {
    return this.find({
        $or : [
            { name : { $regex : keyword }},
            { company : { $regex : keyword }},
            { target : { $regex : keyword }},
        ]
    })
};

MedicineSchema.statics.findByMedicineId = function(medicineId) {
    return this.findOne({ medicineId })
};


module.exports = mongoose.model('Medicine', MedicineSchema);