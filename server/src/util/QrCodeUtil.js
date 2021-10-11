const QrCode = require('qrcode');
const moment = require('moment');


exports.generateQrCode_prescribe = async ({ medicine, dailyDosage, totalDosage, patientId, doctorId }) => {
    // eslint-disable-next-line no-undef
    const directory = process.env.QR_DIR;

    const now = moment().format('YYYY-MM-DD_HH:mm');
    const qrCodeFileName = `${now}_${doctorId}_${patientId}_${medicine.medicineId}_${dailyDosage}_${totalDosage}.png`;

    try {
        await QrCode.toFile(
            directory + '/' + qrCodeFileName,
            `${medicine.medicineId}/${dailyDosage}/${totalDosage}/${doctorId}/${patientId}/${medicine.name}`,
            {
                color : {
                    dark : '#337DFF',
                    light : '#FFF'
                },
            }
        );

        return {
            directory,
            qrCodeFileName,
        };
    
    } catch(e) {
        console.log(e);
        return null;
    }

};