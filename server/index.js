const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const Mongoose = require('mongoose');

require('dotenv').config();
const { SERVER_PORT, MONGO_URL } = process.env;

const app = new Koa();
const router = new Router();

const api = require('./src/api');

Mongoose.connect(MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true
}).then(() => {
    console.log('Mongo DB is connected');
}).catch(e => {
    console.log(e, error);
})

app.use(bodyparser());
router.use('/api', api.routes());
app.use(router.routes()).use(allowedMethods());

app.listen(SERVER_PORT, () => {
    console.log(SERVER_PORT, 'is connected');
})