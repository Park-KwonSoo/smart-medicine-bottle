const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    fdbDtm : { type : Date, default : Date.now, required : true, },
    fdbType : { type : String, required : true, },
    bmId : { 
        type : Schema.Types.ObjectId, 
        required : true, 
        ref : 'BottleMedicine', 
    }, 
    doctorId : { type : String, required : true, ref : 'User', lowercase : true, },
    feedback : { type : String, required : true, },
});

FeedbackSchema.statics.findAllByBottleId = function(bottleId) {
    return this.find({ bottleId });
};

FeedbackSchema.statics.findAllByBottleIdAndDoctorId = function(bottleId, doctorId) {
    return this.find({ bottleId, doctorId });
};


module.exports = mongoose.model('Feedback', FeedbackSchema);