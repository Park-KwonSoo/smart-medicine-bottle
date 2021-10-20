const { Storage } = require('@google-cloud/storage');
const fs = require('fs');

const storage = new Storage();
const GoogleStorageUrl = 'https://storage.googleapis.com/';


//의사 아이디, 업로드할 파일명, 업로드할 파일 경로를 인자로 받아, File을 GCS에 업로드 후 GCS 주소를 반환
exports.uploadDoctorLicense = async ({ userId, fileName, filePath }) => {
    const destination = userId + '_' + fileName;
    try {
        const result = await storage.bucket('doctor-info').upload(filePath, {
            destination,
        });
    
        const doctorLicenseUrl = GoogleStorageUrl + `${result[0].bucket.id}/${result[0].name}`;
    
        return doctorLicenseUrl;
    } catch(e) {
        console.log(e);
        return null;
    }
};

//의사 정보를 인자로 받아 해당 Doctor License의 Signed URL을 반환
exports.viewDoctorLicense = async ({ doctorInfo }) => {
    try {
        const fileName = doctorInfo.info.doctorLicense.split('/').pop();
        const file = storage.bucket('doctor-info').file(fileName);
        const option = {
            version : 'v4',
            expires : Date.now() + 1000 * 60 * 15,
            action : 'read',
        };
    
        const [signedUrl] = file ? await file.getSignedUrl(option) : [null];
    
        return signedUrl;   
    } catch(e) {
        console.log(e);
        return null;
    }
};

//의사 ID, 약 ID, 복용량을 인자로 받아, QR Code를 생성
exports.uploadQrCode = async ({ directory, qrCodeFileName }) => {
    const destination = qrCodeFileName;
    try {
        //파일을 GCS에 업로드
        const result = await storage.bucket('prescribe-medicine-qrcode').upload(directory + '/' + qrCodeFileName, {
            destination
        });

        //업로드 후 파일 삭제
        fs.rm(directory + '/' + qrCodeFileName, () => {});
    
        const qrCodeUrl = GoogleStorageUrl + `${result[0].bucket.id}/${result[0].name}`;
    
        return qrCodeUrl;
    } catch(e) {
        console.log(e);
        return null;
    }
};

//생성된 QR코드의 signedUrl을 가져옴
exports.getQrCodeUrl = async ({ qrCodeFileName }) => {
    try {
        const fileName = qrCodeFileName;
        const file = storage.bucket('prescribe-medicine-qrcode').file(fileName);
        const option = {
            version : 'v4',
            expires : Date.now() + 1000 * 60 * 15,
            action : 'read',
        };

        const [signedUrl] = file ? await file.getSignedUrl(option) : [null];

        return signedUrl;
    } catch(e) {
        console.log(e);
        return null;
    }
};