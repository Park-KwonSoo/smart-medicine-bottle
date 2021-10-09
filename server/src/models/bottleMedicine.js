const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BottleMedicineSchema = new Schema({
    bottleId : {
        type : Number,
        ref : 'Bottle',
        required : true,
    },
    medicineId : {
        type : Number,
        ref : 'Medicine',
        required : true,
    },    
    doctorId : {
        type : String,
        ref : 'User',
        lowercase : true,
    },
    dailyDosage : {
        type : Number,
        default : 1,
    },
    totalDosage : {
        type : Number,
        default : 1,
    },
    eachWeight : {
        type : Number,
        default : 0,
    },
    totalWeight : {
        type : Number,
        default : 0,
    },
    regDtm : { 
        type : Date,
        default : Date.now,
    },
    useYn : {
        type : String,
        required : true,
        default : 'Y',
    },
});

BottleMedicineSchema.methods.setDoctorId = function(doctorId) {
    this.doctorId = doctorId;
};

BottleMedicineSchema.methods.setEachWeight = function(eachWeight) {
    this.eachWeight = eachWeight;
};

BottleMedicineSchema.methods.setTotalWeight = function(totalWeight) {
    this.totalWeight = totalWeight;
};

BottleMedicineSchema.methods.setUseYn = function(useYn) {
    this.useYn = useYn;
};


module.exports = mongoose.model('BottleMedicine', BottleMedicineSchema);