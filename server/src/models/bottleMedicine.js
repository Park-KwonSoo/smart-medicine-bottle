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
        required : true,
    },
    dosage : {
        type : Number,
        required : true,
        default : 0,
    },
    regDtm : { 
        type : Date,
        required : true,
        default : Date.now,
    }
});


module.exports = mongoose.model('BottleMedicine', BottleMedicineSchema);