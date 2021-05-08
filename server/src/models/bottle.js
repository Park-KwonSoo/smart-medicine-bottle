const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BottleSchema = new Schema ({
    bottleId : { type : String, required : true, unique : true },
    temperature : { type : Number, default : 0 },
    humidity : { type : Number, default : 0 },
    balance : { type : Number, default : 0 },
    recentOpen : { type : Date, default : Date.now },
    medicineId : Number,
    hubId : Number
})

BottleSchema.statics.findByBottleId = function(bottleId) {
    return this.findOne({ bottleId });
};

module.exports = mongoose.model('Bottle', BottleSchema);