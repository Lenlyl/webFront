const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

const app = new Koa();

let users = [
    { id: 1, username: 'zMouse' },
    { id: 2, username: 'haizi' },
    { id: 3, username: 'xiaorui' },
    // { id: 4, username: 'mt' }
];

app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

let router = new KoaRouter();

router.get('/users', async (ctx, next) => {
    // 当下，即使数据和上次某个客户端请求的数据之间没有任何的变化，那么服务端这里还是给返回了
    ctx.body = users;
});


app.use(router.routes());

app.listen(8888);