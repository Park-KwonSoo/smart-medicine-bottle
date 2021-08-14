const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    fdbDtm : { type : Date, default : Date.now, required : true, },
    fdbType : { type : String, required : true, },
    bottleId : { type : Number, required : true, }, 
    doctorId : { type : String, required : true, },
    feedback : { type : String, required : true, },
});

FeedbackSchema.statics.findAllByBottleId = function(bottleId) {
    return this.find({ bottleId });
};

FeedbackSchema.statics.findAllByBottleIdAndDoctorId = function(bottleId, doctorId) {
    return this.find({ bottleId, doctorId });
};


module.exports = mongoose.model('Feedback', FeedbackSchema);