//유저에 관련된 Api
const User = require('../../models/user');
const Profile = require('../../models/profile');
const jwt = require('jsonwebtoken');


exports.getMyDetail = async ctx => {
    const token = ctx.req.headers.authorization
    if (!token || !token.length) {
        ctx.status = 401
        return
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(userId)
    if(!user || !user.userTypeCd || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const profile = await Profile.findByUserId(userId);

    ctx.status = 200;
    ctx.body = profile;

}

//toDo
exports.updateMyInfo = async ctx => {
    
}
