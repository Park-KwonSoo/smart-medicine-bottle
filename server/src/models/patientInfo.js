const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const PatientInfoSchema = new Schema({
    patientId : { type : String, required : true, },
    doctorId : { type : String, required : true, },
    info : { type : String, required : true, },
});

PatientInfoSchema.statics.findAllByPatientId = function(patientId) {
    return this.find({ patientId });
};

PatientInfoSchema.statics.findAllByDoctorId = function(doctorId) {
    return this.find({ doctorId });
};

PatientInfoSchema.statics.findByPatientIdAndDoctorId = function(patientId, doctorId) {
    return this.findOne({ patientId, doctorId });
};

PatientInfoSchema.methods.getInfo = function() {
    return this.info;
};

PatientInfoSchema.methods.updateInfo = function(info) {
    const date = moment(new Date()).format('YYYY-MM-DD hh:mm');
    if(this.info.length)
        this.info = this.info.concat('\n\n', `${date} => ${info}`);
    else
        this.info = `${date} => ${info}`;
};


module.exports = mongoose.model('PatientInfo', PatientInfoSchema);