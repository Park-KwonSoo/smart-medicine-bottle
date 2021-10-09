const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TakeMedicineHistorySchema = new Schema ({
    takeDate : {
        type : Date,
        default : Date.now,
    },
    bmId : { 
        type : Schema.Types.ObjectId,
        ref : 'BottleMedicine',
        required : true,
    },
    temperature : { type : Number, default : 0 },
    humidity : { type : Number, default : 0 },
    dosage : { type : Number, default : 0 },
});


module.exports = mongoose.model('TakeMedicineHist', TakeMedicineHistorySchema);