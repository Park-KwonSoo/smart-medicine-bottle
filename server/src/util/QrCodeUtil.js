const QrCode = require('qrcode');
const moment = require('moment');


exports.generateQrCode_prescribe = async ({ medicine, dosage, patientId, doctorId }) => {
    const directory = "/Users/parkkwonsoo/Desktop/Project/Capstone_Design_1/server/data/";

    const now = moment().format('YYYY-MM-DD_HH:mm');
    const qrCodeFileName = `${now}_${doctorId}_${patientId}_${medicine.medicineId}_${dosage}.png`;

    try {
        await QrCode.toFile(
            directory + qrCodeFileName,
            `${medicine.name}/${medicine.medicineId}/${dosage}/${patientId}/${doctorId}`,
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