const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BottleSchema = new Schema ({
    bottleId : { type : Number, required : true, unique : true },
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

BottleSchema.methods.getBottleId = function() {
    return this.bottleId;
};

BottleSchema.methods.getRecentOpenDate = function() {
    return this.recentOpen;
};

BottleSchema.methods.getTemperature = function() {
    return this.temperature;
};

BottleSchema.methods.getHumidity = function() {
    return this.humidity;
};

BottleSchema.methods.getBalance = function() {
    return this.balance;
};

BottleSchema.methods.getMedicineId = function() {
    return this.medicineId;
};

BottleSchema.methods.getHubId = function() {
    return this.hubId;
};

module.exports = mongoose.model('Bottle', BottleSchema);