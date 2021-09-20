const Koa = require('koa');
const Router = require('koa-router');

const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');

const Mongoose = require('mongoose');
const api = require('./src/api');
const MqttServer = require('./src/util/MqttServer');
const BatchSystem = require('./src/util/Batch');
const FCM = require('./src/util/FCM');

require('dotenv').config();
// eslint-disable-next-line no-undef
const { SERVER_PORT, MONGO_URL } = process.env;

const app = new Koa();
const router = new Router();


Mongoose.connect(MONGO_URL, {
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true
}).then(() => {
    console.log('\x1b[1;32mMongo DB is connected : ', MONGO_URL, '\x1b[0m');
    BatchSystem.updateMedicineData();
}).catch(e => {
    console.log(e);
});

app.use(bodyparser());
router.use('/api', api.routes());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(SERVER_PORT, () => {
    console.log('\x1b[1;36mPORT : ', SERVER_PORT, 'is connected\x1b[0m');
    MqttServer.on();
    FCM.initializeFCM();
    BatchSystem.removeQrCode();
    BatchSystem.pushNotifyByDosage();
});