const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

const app = new Koa();

app.use(KoaStaticCache({
    prefix: '',
    dir: './public',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();

app.use(router.routes());

app.listen(9999);