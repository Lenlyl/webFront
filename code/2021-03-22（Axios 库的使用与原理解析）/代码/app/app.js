const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');

const app = new Koa();

app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();

router.get('/data', async (ctx, next) => {
    ctx.body = 'kkb';
})

router.post('/upload', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/upload',
        keepExtensions: true
    }
}), async (ctx, next) => {
    ctx.body = '上传成功'
});

app.use(router.routes());

app.listen(8888);