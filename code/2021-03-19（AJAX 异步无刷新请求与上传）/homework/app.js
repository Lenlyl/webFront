const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const db = require('./middlewares/db');
const koaBody = require('koa-body');
const app = new Koa();

//静态资源
app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    dynamic: true,
    gzip: true
}));

//连接数据库
app.use(db());

const router = new KoaRouter();

router.get('/categories', async (ctx, next) => {

    const [categories] = await ctx.state.conn.query(
        'SELECT * FROM `categories` ',
    )
    ctx.body = categories;
})

router.get('/items', async (ctx, next) => {

    let limit = 4;
    let page = ctx.request.query.page || 1;
    let offset = (page - 1) * limit;

    const [[{ count }]] = await ctx.state.conn.query(
        'select count(*) as count from `items`'
    )
    let totalPage = Math.ceil(count/limit);

    const [items] = await ctx.state.conn.query(
        'SELECT * FROM `items` limit ? offset ?',
        [limit, offset]
    )

    ctx.body = {
        page, //当前页
        items, //当前页数据
        totalPage, //总页数
        count //总条数
    }
})

router.post('/avatar', koaBody({
    multipart: true, //是否支持 multipart-formdate 的表单
    formidable: {
        maxFileSize: 10 * 1024 * 1024, //10M 限制文件大小
        uploadDir: './public/avatar', //文件上传存储路径
        keepExtensions: true, //保留源文件后缀名
        hash: true
    },
}), (ctx, next) => {
    const {avatar} = ctx.request.files;
    console.log(avatar);
    ctx.body = '/' + avatar.path;
})

app.use(router.routes());

app.listen(3000);