const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const db = require('./middlewares/db');
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

    const [items] = await ctx.state.conn.query(
        'SELECT * FROM `items` ',
    )
    ctx.body = items
})

app.use(router.routes());

app.listen(3000);