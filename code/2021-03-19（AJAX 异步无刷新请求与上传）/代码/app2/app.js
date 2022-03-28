const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const db = require('./middlewares/db');

const app = new Koa();

app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

app.use(db());

const router = new KoaRouter();

// 获取所有分类
router.get('/categories', async (ctx, next) => {
    let [categories] = await ctx.state.conn.query(
        "select * from `categories`"
    );

    ctx.body = categories;
});


// 获取所有商品
router.get('/items', async (ctx, next) => {
    // 1 => 0,1,2,3
    // 2 => 4,5,6,7
    // 3 => 8,9,10,11

    let limit = 4;  // 每页显示的数据条数
    let page = ctx.request.query.page || 1;   // 当前页
    let offset = (page - 1) * limit;

    // 获取所有的数据的总条数
    let [[{ count }]] = await ctx.state.conn.query(
        "select count(*) as count from `items`"
    );
    // console.log('rs', count);

    let pages = Math.ceil(count / limit);

    let [items] = await ctx.state.conn.query(
        "select * from `items` limit ? offset ?",
        [limit, offset]
    );

    ctx.body = {
        items,
        count,
        page,
        pages
    };
});


// 头像上传
router.post('/avatar', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/avatar',
        keepExtensions: true
    }
}), async (ctx, next) => {
    let { avatar } = ctx.request.files;

    // console.log(avatar);

    ctx.body = '/' + avatar.path;
});


app.use(router.routes());

app.listen(8888);