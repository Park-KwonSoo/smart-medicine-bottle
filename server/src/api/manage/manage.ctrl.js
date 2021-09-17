const User = require('../../models/user');
const DoctorInfo = require('../../models/doctorInfo');
const jwt = require('jsonwebtoken');
const { viewDoctorLicense } = require('../../util/GoogleCloudStorage');


/**
 * 의사 회원가입을 요청한 회원 리스트를 확인한다.
 * http methods : get
 * @param {*} ctx 
 * @returns 
 */
exports.getDoctorRegReqList = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'MANAGER' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    try {
        const doctorRegReqList = await DoctorInfo.find({
            useYn : 'W',
        });

        ctx.status = 200;
        ctx.body = {
            doctorRegReqList
        };

    } catch(e) {
        ctx.status = 500;
        ctx.body = {
            error : '알 수 없는 에러가 발생했습니다.',
        };
        console.log(e);
    }
};

/**
 * 의사 신청을 한 회원을 상세 조회한다.
 * http methods : get
 * @param {*} ctx 
 * @returns 
 */
exports.getDoctorRegReqDetail = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'MANAGER' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    try {
        const { doctorId } = ctx.params;
        const doctor = await User.findOne({ userId : doctorId });
        if(!doctor) {
            ctx.status = 404;
            ctx.body = {
                error : '존재하지 않는 회원입니다.',
            };
            return;
        } else if(doctor.userTypeCd !== 'DOCTOR') {
            ctx.status = 400;
            ctx.body = {
                error : '의사로 가입된 회원이 아닙니다.',
            };
            return;
        } else if (doctor.useYn !== 'W') {
            ctx.status = 400;
            ctx.body = {
                error : '이미 의사로 가입된 회원입니다.',
            };
            return;
        }

        const doctorInfo = await DoctorInfo.findOne({ doctorId });
        if(!doctorInfo) {
            ctx.status = 404;
            ctx.body = {
                error : '의사 자격이 증명되지 않은 회원입니다.',
            };
            return;
        } else if(doctorInfo.useYn === 'Y') {
            ctx.status = 400;
            ctx.body = {
                error : '이미 의사 인증이 완료된 회원입니다.'
            };
            return;
        } else if(doctorInfo.useYn === 'N') {
            ctx.status = 400;
            ctx.body = {
                error : '의사 인증이 거절된 회원입니다.',
            };
            return;
        }

        
        const doctorLicense = await viewDoctorLicense({
            doctorInfo
        });

        ctx.status = 200;
        ctx.body = {
            doctorInfo : {
                ...doctorInfo._doc,
                info : {
                    ...doctorInfo.info,
                    doctorLicense,
                },
            }, 
        };

    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            error : '알 수 없는 에러가 발생했습니다.',
        };
    }
};

/**
 * 의사 요청이 온 회원을 수락한다.
 * http methods : post
 * @param {*} ctx 
 * @returns 
 */
exports.acceptDoctorRegReq = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'MANAGER' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    try {
        const { doctorId } = ctx.request.body;
        const doctor = await User.findOne({ userId : doctorId });
        if(!doctor) {
            ctx.status = 404;
            ctx.body = {
                error : '존재하지 않는 회원입니다.',
            };
            return;
        } else if(doctor.useYn === 'N') {
            ctx.status = 400;
            ctx.body = {
                error : '탈퇴된 회원입니다.',
            };
            return;
        } else if(doctor.useYn === 'Y') {
            ctx.status = 400;
            ctx.body = {
                error :  '이미 가입이 완료된 의사입니다.',
            };
            return;
        } else if(doctor.userTypeCd !== 'DOCTOR') {
            ctx.status = 400;
            ctx.body = {
                error : '의사로 가입된 회원이 아닙니다.',
            };
            return;
        }

        const doctorInfo = await DoctorInfo.findOne({
            doctorId,
            useYn : 'W',
        });

        doctor.setUseYn('Y');
        doctor.save();
        doctorInfo.setUseYn('Y');
        doctorInfo.save();

        ctx.status = 200;

    } catch(e) {
        ctx.status = 500;
        ctx.body = {
            error : '알 수 없는 에러가 발생했습니다.',
        };
        console.log(e);
    }
};

/**
 * 의사 요청이 온 회원을 거절한다.
 * http methods : post
 * @param {*} ctx 
 * @returns 
 */
 exports.rejectDoctorRegReq = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'MANAGER' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    try {
        const { doctorId } = ctx.request.body;
        const doctor = await User.findOne({ userId : doctorId });
        if(!doctor) {
            ctx.status = 404;
            ctx.body = {
                error : '존재하지 않는 회원입니다.',
            };
            return;
        } else if(doctor.useYn === 'N') {
            ctx.status = 400;
            ctx.body = {
                error : '탈퇴된 회원입니다.',
            };
            return;
        } else if(doctor.useYn === 'Y') {
            ctx.status = 400;
            ctx.body = {
                error :  '이미 가입이 완료된 의사입니다.',
            };
            return;
        } else if(doctor.userTypeCd !== 'DOCTOR') {
            ctx.status = 400;
            ctx.body = {
                error : '의사로 가입된 회원이 아닙니다.',
            };
            return;
        }


        const doctorInfo = await DoctorInfo.findOne({
            doctorId,
            useYn : 'W',
        });

        doctor.setUseYn('N');
        doctor.save();
        doctorInfo.setUseYn('N');
        doctorInfo.save();

        ctx.status = 200;

    } catch(e) {
        ctx.status = 500;
        ctx.body = {
            error : '알 수 없는 에러가 발생했습니다.',
        };
        console.log(e);
    }
};

/**
 * 회원가입을 요청한 의사의 유효한 자격 번호인지를 검증한다.
 * @param {*} ctx 
 * @returns 
 */
exports.validateDoctorLicense = async ctx => {
    const token = ctx.req.headers.authorization;
    if (!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.userTypeCd !== 'MANAGER' || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }

    const { doctorLicense } = ctx.request.body;
    const doctorInfo = await DoctorInfo.find({ 'info.doctorLicense' : doctorLicense });

    ctx.status = 200;
    ctx.body = {
        result : doctorInfo.length > 1 ? false : true,
    };

};

