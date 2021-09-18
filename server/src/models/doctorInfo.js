const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DoctorInfoSchema = new Schema({
    doctorId : { type : String, required : true, lowercase : true, },
    info : {
        doctorLicense : { type : String, required : true, },
        validateDoctorLicense : { type : String, default : null },
        hospitalNm : { type : String, default : null, },
        hospitalAddr : { type : String, default : null, },
        contact : { type : String, required : true, },
        doctorType : { type : String, default : null, },
        doctorNm : { type : String, required : true, },
    },
    useYn : { type : String, default : 'W', required : true, },
});

DoctorInfoSchema.statics.findByDoctorId = function(doctorId) {
    return this.findOne({ doctorId });
};

DoctorInfoSchema.methods.setUseYn = function(useYn) {
    this.useYn = useYn;
};

DoctorInfoSchema.methods.setValidateDoctorLicense = function(validateDoctorLicense) {
    this.info.validateDoctorLicense = validateDoctorLicense;
};


module.exports = mongoose.model('DoctorInfo', DoctorInfoSchema);
