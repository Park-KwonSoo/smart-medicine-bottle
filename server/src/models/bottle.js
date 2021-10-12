const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BottleSchema = new Schema ({
    bottleId : { type : Number, required : true, unique : true },
    hubId : { type : Number, required : true, ref : 'Hub', },
    bottleNm : { type : String, required : true, maxlength : 10, },
});

BottleSchema.statics.findByBottleId = function(bottleId) {
    return this.findOne({ bottleId });
};

BottleSchema.statics.findAllByHubId = function(hubId) {
    return this.find({ hubId });
};

BottleSchema.methods.getBottleId = function() {
    return this.bottleId;
};

BottleSchema.methods.getHubId = function() {
    return this.hubId;
};

BottleSchema.methods.setBottleNm = function(bottleNm) {
    this.bottleNm = bottleNm;
}


module.exports = mongoose.model('Bottle', BottleSchema);