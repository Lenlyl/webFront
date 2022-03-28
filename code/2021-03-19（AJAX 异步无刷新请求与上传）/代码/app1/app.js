const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

let users = [
    {
        id: 1,
        username: 'zMouse',
    },
    {
        id: 2,
        username: 'haizi'
    },
    {
        id: 3,
        username: 'xiaorui'
    }
];

const app = new Koa();

app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();

// 只返回数据的一个接口
router.get('/users', async (ctx, next) => {
    // koa 这个框架：如果body的值是一个对象，那么它会自动的把这个对象转成 JSON 字符串，且头信息会设置成：content-type: application/json

    // ctx.body = users;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            ctx.body = users;
            resolve();
        }, 3000);
    })
});


app.use(router.routes());


app.listen(8888);