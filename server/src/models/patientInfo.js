const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');

const Schema = mongoose.Schema;

const PatientInfoSchema = new Schema({
    patientId : { type : String, required : true, ref : 'User', },
    doctorId : { type : String, required : true, ref : 'User', },
    info : { type : String, required : true, },
    useYn : { type : String, required : true, default : 'W', },
});

PatientInfoSchema.statics.findAllByPatientIdAndUseYn = function(patientId, useYn) {
    return this.find({ patientId, useYn });
};

PatientInfoSchema.statics.findAllByDoctorIdAndUseYn = function(doctorId, useYn) {
    return this.find({ doctorId, useYn });
};

PatientInfoSchema.statics.findByPatientIdAndDoctorId = function(patientId, doctorId) {
    return this.findOne({ patientId, doctorId });
};

PatientInfoSchema.statics.findByPatientIdAndDoctorIdAndUseYn = function(patientId, doctorId, useYn) {
    return this.findOne({ patientId, doctorId, useYn });
};

PatientInfoSchema.methods.getInfo = function() {
    return this.info;
};

PatientInfoSchema.methods.setUseYn = function(useYn) {
    this.useYn = useYn;
};

PatientInfoSchema.methods.updateInfo = function(info) {
    const date = moment.tz('Asia/Seoul').format('YYYY-MM-DD HH:mm');
    if(this.info.length)
        this.info = this.info.concat('\n\n', `${date} -> ${info}`);
    else
        this.info = `${date} ➡ ${info}`;
};


module.exports = mongoose.model('PatientInfo', PatientInfoSchema);