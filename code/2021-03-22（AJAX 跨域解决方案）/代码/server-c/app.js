const Koa = require('koa');
const KoaRouter = require('koa-router');
const jwt = require('jsonwebtoken');
const KoaStaticCache = require('koa-static-cache');

let key = 'kkb';

const app = new Koa();

app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();

router.post('/signin', async (ctx, next) => {
    let token = jwt.sign({
        id: 1,
        username: 'Ton'
    }, key);
    // console.log('token', token);

    ctx.set('Authorization', token);

    ctx.body = '登录成功'
});

router.get('/data', async (ctx, next) => {
    try {
        let user = jwt.verify(ctx.headers.authorization, key);
        console.log('user', user);
        ctx.body = [1, 2, 3, 4, 5];
    } catch (e) {
        ctx.throw(401);
    }


})

app.use(router.routes());

app.listen(8888);