//회원가입, 로그인 및 로그아웃에 관한 api
const User = require('../../models/user');
const Profile = require('../../models/profile');
const DoctorInfo = require('../../models/doctorInfo');
const Hub = require('../../models/hub');
const Bottle = require('../../models/bottle');
const PatientInfo = require('../../models/patientInfo');
const { uploadDoctorLicense } = require('../../util/GoogleCloudStorage');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const axios = require('axios');


exports.register = async(ctx) => {
    const { 
        userId,
        password,
        passwordCheck,
        userNm,
        birth,
        contact,
        deviceToken,
    } = ctx.request.body;

    const schema = Joi.object().keys({
        userId : Joi.string().email().max(50).required(),
        password : Joi.string().required(),
        passwordCheck : Joi.string().required(),
        userNm : Joi.string().required(),
        birth : Joi.string().required(),
        contact : Joi.string().required(),
        deviceToken : Joi.string(),
    });
    
    const result = schema.validate(ctx.request.body);
    if(result.error || password !== passwordCheck) {
        ctx.status = 400;
        ctx.body = {
            error : '회원가입 양식이 잘못되었습니다.',
        };
        return;
    }

    const existUser = await User.findByUserId(userId);
    if(existUser) {
        ctx.status = 409;
        ctx.body = {
            error : '이미 존재하는 회원입니다.',
        };
        return;
    }

    const existContact = await Profile.findOne({ contact, useYn : 'Y' });
    if(existContact) {
        ctx.status = 409;
        ctx.body = {
            error : '이미 가입된 번호입니다.',
        };
        return;
    }

    const user = new User({
        userId,
        userTypeCd : 'NORMAL',
        useYn : 'Y',
    });

    await user.setPassword(password);

    const profile = new Profile({
        userId,
        userNm,
        birth,
        contact,       
        deviceToken, 
    });

    await user.save();
    await profile.save();

    ctx.status = 201;

};

exports.searchHospital = async ctx => {
    const {
        hospitalNm,
        page,
    } = ctx.query;

    const pageSlice = 5;

    const url = 'http://apis.data.go.kr/B551182/hospInfoService1/getHospBasisList1';
    // eslint-disable-next-line no-undef
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + process.env.SERVICE_KEY;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(page);
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(pageSlice);
    queryParams += '&' + encodeURIComponent('yadmNm') + '=' + encodeURIComponent(hospitalNm);

    const result = await axios.get(url + queryParams);
    
    ctx.status = 200;
    ctx.body = {
        totalPage : Math.ceil(result.data.response.body.totalCount / pageSlice),
        hospitalList : result.data.response.body.items.item,
    };
};

//의사 회원가입
exports.doctorRegister = async ctx => {
    const { 
        userId, 
        password, 
        passwordCheck,

        contact,
        hospitalNm,
        hospitalAddr,
        doctorType,
        doctorNm,
    } = ctx.request.body;

    const { doctorInfoFile } = ctx.request.files;


    const schema = Joi.object().keys({
        userId : Joi.string().email().max(50).required(),
        password : Joi.string().required(),
        passwordCheck : Joi.string().required(),
        doctorInfoFile : Joi.object().required(),
    });

    const result = schema.validate({
        userId,
        password,
        passwordCheck,
        doctorInfoFile,
    });
    if(result.error || password !== passwordCheck) {
        ctx.status = 400;
        ctx.body = {
            error : '회원가입 양식이 잘못되었습니다.',
        };
        return;
    }

    const existUser = await User.findByUserId(userId);
    if(existUser) {
        ctx.status = 409;
        ctx.body = {
            error : '이미 존재하는 회원입니다.',
        };
        return;
    }

    const existDoctorInfo = await DoctorInfo.findByDoctorId(userId);
    if(existDoctorInfo && existDoctorInfo.useYn === 'W') {
        ctx.status = 401;
        ctx.body = {
            error : '가입 승인 대기중인 회원입니다.',
        };
        return;
    } else if(existDoctorInfo && existDoctorInfo.useYn === 'N') {
        ctx.status = 401;
        ctx.body = {
            error : '가입이 거절된 회원입니다.',
        };
        return;
    }
    

    const [fileName, filePath] = [doctorInfoFile.name, doctorInfoFile.path];
    const doctorLicense = await uploadDoctorLicense({
        userId,
        fileName,
        filePath,
    });

    const info = {
        contact,
        hospitalAddr,
        hospitalNm,
        doctorType,
        doctorNm,
        doctorLicense,
    };
    

    const doctor = new User({
        userId,
        userTypeCd : 'DOCTOR',
        useYn : 'W',
    });

    await doctor.setPassword(password);

    const doctorInfo = new DoctorInfo({
        doctorId : userId,
        info,
        useYn : 'W',
    });    

    await doctor.save();
    await doctorInfo.save();
    
    ctx.status = 201;
  
}

/**
 * 로컬 로그인
 * @param {*} ctx 
 * @returns token
 * http methods : POST
 */
exports.login = async(ctx) => {
    const { userId, password, deviceToken } = ctx.request.body;

    const schema = Joi.object().keys({
        userId : Joi.string().email().max(50).required(),
        password : Joi.string().required(),
        deviceToken : Joi.string(),
    });

    const result = schema.validate(ctx.request.body);
    if(result.error) {
        ctx.status = 400;
        ctx.body = {
            error : '로그인 양식이 잘못되었습니다.',
        };
        return;
    }

    const user = await User.findByUserId(userId);
    if(!user || !user.userTypeCd || user.authTypeCd !== 'NORMAL') {
        ctx.status = 401;
        ctx.body = {
            error : '존재하지 않는 회원입니다.',
        };
        return;
    }

    const isPasswordTrue = await user.checkPassword(password);
    if(!isPasswordTrue) {
        ctx.status = 401;
        ctx.body = {
            error : '비밀번호가 틀렸습니다.',
        };
        return;
    }
    if(user.useYn !== 'Y') {
        ctx.status = 403;
        ctx.body = {
            error : '가입 대기중이거나 탈퇴한 회원입니다.',
        };
        return;
    }

    //일반 유저의 deviceToken값이 바뀌면 업데이트한다 = 기기가 바뀌면
    if(user.userTypeCd === 'NORMAL') {
        const profile = await Profile.findByUserId(user.userId);
        if(deviceToken && profile.deviceToken !== deviceToken) {
            profile.updateDeviceToken(deviceToken);
            await profile.save();
        }
    }


    const token = await user.generateToken();
    ctx.cookies.set('access_token', token, {
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24 * 30
    });

    ctx.status = 200;
    ctx.body = {
        userTypeCd : user.userTypeCd,
        token,
    };

};

//social Register
exports.socialRegister = async ctx => {
    const { socialType } = ctx.params;
    const { accessToken, deviceToken } = ctx.request.body;

    const verifyingToken = 
        socialType.toUpperCase() === 'GOOGLE' ? async () => {
            //id_token
            const result = jwt.decode(accessToken);

            return {
                userId : result.email,
                userNm : result.name,
                contact : `${result.email}_등록되지않은 번호`,
                birth : '등록되지않음',
            };
        } 
        : socialType.toUpperCase() === 'NAVER' ? async () => {
            const url = 'https://openapi.naver.com/v1/nid/me';
            const result = await axios.get(url, {
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                },
            });

            const { email, mobile, name, birthday, birthyear } = result.data.response;

            return {
                userId : email,
                userNm : name,
                contact : mobile,
                birth : `${birthyear}-${birthday}`,
            };
        }
        : socialType.toUpperCase() === 'KAKAO' ? async () => {
            const url = 'https://kapi.kakao.com/v2/user/me';
            const result = await axios.get(url, {
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                },
            });

            console.log(result);

            return result;
        } : () => null;
    
    
    const verifyingInfo = await verifyingToken();
    if(!verifyingInfo || !verifyingInfo.userId) {
        ctx.status = 403;
        ctx.body = { 
            error : '잘못된 요청',
        };

        return;
    }

    const { userId, userNm, birth, contact } = verifyingInfo;

    const existUser = await User.findByUserId(userId);
    if(existUser) {
        ctx.status = 409;
        ctx.body = {
            error : '이미 가입된 회원',
        };

        return;
    }

    const existContact = await Profile.findOne({ contact, useYn : 'Y'});
    if(existContact) {
        ctx.status = 409;
        ctx.body = {
            error : '이미 가입된 번호',
        };

        return;
    }

    const user = new User({
        userId,
        hashedPassword : 'unnecessary',
        authTypeCd : socialType.toUpperCase(),
        useYn : 'Y',
    });

    const profile = new Profile({
        userId,
        userNm,
        birth,
        contact,
        deviceToken,
    });

    await user.save();
    await profile.save();

    ctx.status = 201;

};

//social Login
exports.socialLogin = async ctx => {
    const { socialType } = ctx.params;
    const { accessToken, deviceToken, } = ctx.request.body;

    const verifyingToken = 
        socialType.toUpperCase() === 'GOOGLE' ? async () => {
            //id_token : google Login
            const result = jwt.decode(accessToken);

            return result.email;
        } 
        : socialType.toUpperCase() === 'NAVER' ? async () => {
            //naver Login
            const url = 'https://openapi.naver.com/v1/nid/me';
            const result = await axios.get(url, {
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                },
            });

            return result.data.response.email;
        }
        : socialType.toUpperCase() === 'KAKAO' ? async () => {
            //kakao Login
            const url = 'https://kapi.kakao.com/v2/user/me';
            const result = await axios.get(url, {
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                },
            });

            console.log(result);

            return result;
        } : () => null;
    
    
    const userId = await verifyingToken();
    if(!userId) {
        ctx.status = 403;
        ctx.body = { 
            error : '잘못된 요청입니다',
        };

        return;
    }

    const user = await User.findByUserId(userId);
    if(!user || user.useYn !== 'Y') {
        ctx.status = 404;
        ctx.body = {
            error : '존재하지 않는 회원입니다.',
        };

        return;
    } else if (user.authTypeCd !== socialType.toUpperCase()) {
        ctx.status = 400;
        ctx.body = {
            error : '잘못된 소셜 로그인입니다.',
        };

        return;
    }

    const profile = await Profile.findOne({ userId });
    if(profile.deviceToken !== deviceToken) {
        profile.updateDeviceToken(deviceToken);
        await profile.save();
    }


    const token = await user.generateToken();

    ctx.status = 200;
    ctx.body = {
        userTypeCd : user.userTypeCd,
        token,
    };

};

/**
 * 로그아웃
 * @param {*} ctx 
 * httm methods : POST
 */
exports.logout = async(ctx) => {
    ctx.cookies.set('access_token', null, {
        httpOnly : true,
        maxAge : 0
    });

    ctx.status = 204;
};


/**
 * 회원 탈퇴
 * @param {*} ctx 
 * http methods : delete
 */
exports.secession = async ctx => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 401;
        return;
    }

    // eslint-disable-next-line no-undef
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByUserId(userId);
    if(!user || user.useYn !== 'Y') {
        ctx.status = 403;
        return;
    }


    const { password } = ctx.query;
    const isPasswordTrue = await user.checkPassword(password);
    if(!isPasswordTrue) {
        ctx.status = 401;
        ctx.body = {
            error : '비밀번호가 틀렸습니다.',
        };
        return;
    }

    if(user.userTypeCd === 'NORMAL') {
        //프로필 삭제
        await Profile.updateOne({ userId }, { useYn : 'N' });

        //유저에 등록된 허브, 약병, 약병정보 전부 삭제
        const hubList = await Hub.find({ userId });
        await Promise.all(hubList.map(async hub => {
            await Bottle.deleteMany({ hubId : hub.hubId });
        }));

        await Hub.deleteMany({ userId });

        //환자 정보 삭제
        await PatientInfo.updateMany({ patientId : userId, useYn : 'Y'}, { useYn : 'N' });

        //유저 삭제
        await user.setUseYn('N');
        await user.save();

    } else if (user.userTypeCd === 'DOCTOR') {
        //의사 정보 및 환자 정보 삭제
        await DoctorInfo.updateOne({ doctorId : userId }, { useYn : 'WS' });
        await PatientInfo.updateMany({ doctorId : userId }, { useYn : 'WS' });

        await user.setUseYn('WS');
        await user.save();
    }

    ctx.status = 200;

};

exports.verifyToken = async(ctx) => {
    const token = ctx.req.headers.authorization;
    if(!token || !token.length) {
        ctx.status = 400;
        ctx.body = {
            name : 'Token Not Exist',
            message : 'Not Exist Token',
            expiredAt : null,
        };
        return;
    }

    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            ctx.status = 400;
            ctx.body = err;
            return;
        }
    });

    ctx.status = 200;
    ctx.body = {
        name : 'Token Exist',
        message : 'Token Work',
        expiredAt : null,
    };
};