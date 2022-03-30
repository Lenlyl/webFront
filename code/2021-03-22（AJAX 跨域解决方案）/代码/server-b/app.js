const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

router.get('/data', async (ctx, next) => {
    ctx.body = [1, 2, 3, 4, 5];
})

app.use(router.routes());

app.listen(8888);