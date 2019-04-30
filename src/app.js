const Koa = require('koa');
const cors = require('@koa/cors'); //npm install @koa/cors@2

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const api = require('./api');

const env = process.env.NODE_ENV || 'development';

const models = require('./models');

//데이터베이스 연결확인
models.sequelize.authenticate().then(() => {
        console.log('Connected to Database:');
    })
    .catch(err => {
        console.error('Unable to connect to Database:', err);
    });

if (env === 'development') {
    models.sequelize.sync({force: true});
} else {
    models.sequelize.sync();
}


const app = new Koa();

// cors 를 사용하지 않으면 front-end 에서 back-end 의 REST-API 호출은 다른 서버로
// 요청하는 것이므로 cross-origin HTTP 요청이 된다. 보안상의 문제로 이러한 요청은 제한된다.
// 이를 허용하기 위해 cors(cross-origin resource sharing)를 사용한다.
// webpack proxy 설정을 하면 필요 없음
//app.use(cors());


const router = new Router();

//Rest API 라우터를 /api 에 넣기로 한다.
router.use('/api', api.routes());

//JSON 형태의 request-response 처리 parser
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());


app.listen(4000, ()=>{
    console.log('listening tp port 4000');
});
