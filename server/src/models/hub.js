const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HubSchema = new Schema ({
    hubId : { type : Number, required : true },
    userId : { type : String, default : null },
    hosting : Object
});

HubSchema.methods.setHubHost = async(hosting) => {
    this.hosting = hosting;
}

HubSchema.methods.getHubHost = async() => {
    return this.hosting;
}

HubSchema.methods.setHub_UserId = async(userId) => {
    this.userId = userId;
}

HubSchema.methods.getHub_UserId = async() => {
    return this.userId;
}

module.exports = mongoose.model('Hub', HubSchema);