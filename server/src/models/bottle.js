const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BottleSchema = new Schema ({
    bottleId : { type : Number, required : true, unique : true },
    temperature : { type : Number, default : 0 },
    humidity : { type : Number, default : 0 },
    balance : { type : Number, default : 0 },
    medicineId : { type : Number, },
    dosage : { type : Number, default : 0 },
    hubId : { type : Number, required : true, },
    doctorId : { type : String, default : null, },
});

BottleSchema.statics.findByBottleId = function(bottleId) {
    return this.findOne({ bottleId });
};

BottleSchema.statics.findAllByHubId = function(hubId) {
    return this.find({ hubId });
};

BottleSchema.statics.findAllByDoctorId = function(doctorId) {
    return this.find({ doctorId });
}

BottleSchema.methods.getBottleId = function() {
    return this.bottleId;
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

BottleSchema.methods.getDoctorId = function() {
    return this.doctorId;
};

BottleSchema.methods.setMedicineId = function(medicineId) {
    this.medicineId = medicineId;
};

BottleSchema.methods.setDosage = function(dosage) {
    this.dosage = dosage;
};

BottleSchema.methods.updateTemperature = function (temperature) {
    this.temperature = temperature;
};

BottleSchema.methods.updateHumidity = function (humidity) {
    this.humidity = humidity;
};

module.exports = mongoose.model('Bottle', BottleSchema);