const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    userId : { type : String, required : true, ref : 'User', },
    userNm : { type : String, required : true, },
    birth : { type : String, required : true, },
    contact : { type : String, required : true, },
    deviceToken : { type : String, default : null, },
});

ProfileSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId });
};

ProfileSchema.methods.updateUserContact = function(contact) {
    this.contact = contact;
};

ProfileSchema.methods.updateDeviceToken = function(deviceToken) {
    this.deviceToken = deviceToken;
};


module.exports = mongoose.model('Profile', ProfileSchema);