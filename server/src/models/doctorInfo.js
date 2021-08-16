const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DoctorInfoSchema = new Schema({
    doctorId : { type : String, required : true, },
    info : {
        doctorLicense : { type : String, required : true, },
        hospitalNm : { type : String, default : null, },
        hospitalAddr : { type : String, default : null, },
        contact : { type : String, required : true, },
    },
    useYn : { type : String, default : 'W', required : true, },
});

DoctorInfoSchema.statics.findByDoctorId = function(doctorId) {
    return this.findOne({ doctorId });
};

DoctorInfoSchema.methods.setUseYn = function(useYn) {
    this.useYn = useYn;
};


module.exports = mongoose.model('DoctorInfo', DoctorInfoSchema);