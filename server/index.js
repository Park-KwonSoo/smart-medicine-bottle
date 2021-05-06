const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const Mongoose = require('mongoose');
const api = require('./src/api');
const updateMedicineInfo = require('./src/lib/UpdatingMedicineInfo');

require('dotenv').config();
const { SERVER_PORT, MONGO_URL } = process.env;

const app = new Koa();
const router = new Router();


Mongoose.connect(MONGO_URL, {
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true
}).then(() => {
    console.log('Mongo DB is connected : ', MONGO_URL);
    updateMedicineInfo.updateMedicineInfo();
}).catch(e => {
    console.log(e, error);
})

app.use(bodyparser());
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(SERVER_PORT, () => {
    console.log('PORT : ', SERVER_PORT, 'is connected');
})