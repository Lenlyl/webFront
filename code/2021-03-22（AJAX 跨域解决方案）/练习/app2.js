const Koa = require("koa");
const KoaRouter = require("koa-router");
const koaStaticCache = require("koa-static-cache");

const app = new Koa();
const router = new KoaRouter();

app.use(koaStaticCache({
    prefix: '',
    dir: './public',
    gzip: true,
    dynamic: true
}));

app.use(async (ctx, next) => {

    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000'); //指定域
    // ctx.set('Access-Control-Allow-Origin', '*'); //所有跨域均可访问

    await next();
})

router.get('/getData', (ctx, next) => {
    ctx.header
    ctx.body = {
        serverName: '4000'
    }
})

app.use(router.routes());
app.listen(4000);