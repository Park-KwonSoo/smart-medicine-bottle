const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    userId : { type: String, required : true, unique : true, lowercase : true, },
    hashedPassword : { type : String, required : true },
    userTypeCd : { type : String, required : true, default : 'NORMAL' },
    useYn : { type : String, default : 'W', required : true, },
});

UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword)
    return result;
};

UserSchema.methods.setUseYn = async function(useYn) {
    this.useYn = useYn;
}

UserSchema.statics.findByUserId = async function(userId) {
    return this.findOne({ userId });
};

UserSchema.statics.findAllByUserTypeCd = async function(userTypeCd) {
    return this.find({ userTypeCd });
};

UserSchema.methods.generateToken = function() {
    const token = jwt.sign (
        {
            _id : this._id,
            userId : this.userId
        },
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET,
        { expiresIn : '30d' }
    );
    return token;
};

module.exports = mongoose.model('User', UserSchema);