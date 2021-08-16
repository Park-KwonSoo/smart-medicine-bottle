const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    userId : { type : String, required : true, ref : 'User', },
    userNm : { type : String, required : true, },
    userAge : { type : Number, required : true, },
    contact : { type : String, required : true, },
});

ProfileSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId });
};

ProfileSchema.methods.updateUserContact = function(contact) {
    this.contact = contact;
};

ProfileSchema.methods.updateUserAge = function() {
    this.userAge = this.userAge + 1;
};


module.exports = mongoose.model('Profile', ProfileSchema);