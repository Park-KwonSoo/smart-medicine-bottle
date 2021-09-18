const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HubSchema = new Schema ({
    hubId : { type : Number, required : true, unique : true },
    hosting : { type : Object, default : null },
    userId : { type : String, default : null, ref : 'User', lowercase : true, },
});

HubSchema.statics.findByHubId = function(hubId) {
    return this.findOne({ hubId })
};

HubSchema.statics.findAllByUserId = function(userId) {
    return this.find({ userId });
};

HubSchema.methods.setHubHost = function(hosting) {
    this.hosting = hosting;
};

HubSchema.methods.getHubHost = function() {
    return this.hosting;
};

HubSchema.methods.setHub_UserId = function(userId) {
    this.userId = userId;
};

HubSchema.methods.getHub_UserId = function() {
    return this.userId;
};

module.exports = mongoose.model('Hub', HubSchema);