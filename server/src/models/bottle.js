const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BottleSchema = new Schema ({
    bottleId : { type : Number, required : true, unique : true },
    temperature : { type : Number, default : 0 },
    humidity : { type : Number, default : 0 },
    balance : { type : Number, default : 0 },
    medicineId : { type : Number, default : null, },
    dosage : { type : Number, default : 0 },
    hubId : { type : Number, ref : 'Hub' },
})

BottleSchema.statics.findByBottleId = function(bottleId) {
    return this.findOne({ bottleId });
};

BottleSchema.statics.findAllByHubId = function(hubId) {
    return this.find({ hubId });
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

BottleSchema.methods.getDosage = function() {
    return this.dosage;
};

BottleSchema.methods.getMedicineId = function() {
    return this.medicineId;
};

BottleSchema.methods.getHubId = function() {
    return this.hubId;
};

BottleSchema.methods.setMedicineId = function(medicineId) {
    this.medicineId = medicineId;
};

BottleSchema.statics.setDosage = function(dosage) {
    this.dosage = dosage;
};

module.exports = mongoose.model('Bottle', BottleSchema);