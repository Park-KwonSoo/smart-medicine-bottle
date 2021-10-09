const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    userId : { type : String, required : true, ref : 'User', lowercase : true, },
    userNm : { type : String, required : true, },
    birth : { type : String, required : true, },
    contact : { type : String, required : true, },
    useYn : { type : String, default : 'Y', },
    deviceToken : { type : String, default : null, },
});

ProfileSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId });
};

ProfileSchema.methods.setUseYn = function(useYn) {
    this.useYn = useYn;
};

ProfileSchema.methods.updateProfileInfo = function({ userNm, birth, contact }) {
    if(userNm)  { this.userNm = userNm }
    if(birth)   { this.birth = birth }
    if(contact) { this.contact = contact }
};

ProfileSchema.methods.updateDeviceToken = function(deviceToken) {
    this.deviceToken = deviceToken;
};


module.exports = mongoose.model('Profile', ProfileSchema);