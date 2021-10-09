const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrescribeInfoSchema = new Schema({
    doctorId : { type : String, require : true, },
    patientId : { type : String, require : true, },
    medicineId : { type : Number, require : true, },
    dailyDosage : { type : Number, require : true, },
    totalDosage : { type : Number, require : true, },
    qrCodeUrl : { type : String, require : true, },
});


module.exports = mongoose.model('PrescribeInfo', PrescribeInfoSchema);