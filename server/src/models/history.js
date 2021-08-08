const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TakeMedicineHistorySchema = new Schema ({
    takeDate : {
        type : Date,
        required : true,
        default : Date.now,
    },
    medicineId : {
        type : Number,
        ref : 'Medicine',
        required : true,
    },
    bottleId : {
        type : Number,
        ref : 'Bottle',
        required : true,
    },
});

TakeMedicineHistorySchema.statics.findByBottleId = async function(bottleId) {
    return this.find({ bottleId });
};

TakeMedicineHistorySchema.statics.findByBottleIdAndMedicineId = async function(bottleId, medicineId) {
    return this.find({ bottleId, medicineId });
};


module.export = mongoose.model("TakeMedicineHist", TakeMedicineHistorySchema);