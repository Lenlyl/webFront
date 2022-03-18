const Koa = require('koa');
const app = new Koa();
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const Nunjucks = require('nunjucks');
const fs = require('fs');
const { resolve } = require('path');
const db = require('./middlewares/db');
const tpl = require('./middlewares/tpl');

//数据转换中间件
const koaBody = require('koa-body');

//1.静态资源
app.use(KoaStaticCache({
    prefix: '/static',
    dir: './static',
    dynamic: true,
    gzip: true
}))

//连接数据库
app.use(db());

//2.动态资源
var router = new KoaRouter();

//模板引擎中间件
app.use(tpl({
    dir: resolve(__dirname, 'template')
}))

router.get('/', async (ctx, next) => {

    const [categories] = await ctx.state.conn.query(
        'SELECT * FROM `categories` ',
    )
    const [items] = await ctx.state.conn.query(
        'SELECT * FROM `items` ',
    )

    ctx.body = ctx.render('index.html', { categories, items });
})

router.get('/list/:id(\\d+)', async (ctx, next) => {
    let [categories] = await ctx.state.conn.query(
        "select * from `categories`"
    );

    // 查询出当前想要看的分类下的所有数据
    let id = ctx.request.params.id;

    // 根据 categories 和 id，获取当前分类的名称
    let category = categories.find(c => c.id == id);

    // console.log('id', id);
    let [items] = await ctx.state.conn.query(
        "select * from `items` where `category_id`=? limit 4",
        [id]
    );

    // console.log('categories', category);

    ctx.body = ctx.render('list.html', {
        categories,
        items,
        category
    });
});

router.get('/detail/:id(\\d+)', async (ctx, next) => {

    const [categories] = await ctx.state.conn.query(
        'SELECT * FROM `categories` ',
    )

    let id = ctx.request.params.id;
    const [[items]] = await ctx.state.conn.query(
        'SELECT * FROM `items` WHERE id = ? ',
        [id]
    )

    ctx.body = ctx.render('detail.html', { categories, items })
})

router.post('/content', koaBody(), async (ctx, next) => {

    const { id, content } = ctx.request.body;
    console.log('评论内容：' + id + '-' + content);
    //存储评论到数据库
    let [rs] = await ctx.state.conn.query(
        "insert into `comments` (`item_id`, `content`, `created_time`) values (?, ?, ?)",
        [id, content, Date.now()]
    );
    console.log('rs', rs);

    ctx.body = '评论成功';
})

app.use(router.routes());

app.use(router.allowedMethods({
    throw: true,
    notImplemented: () => {
        return '不支持当前请求所需要的功能';
    },
    methodNotAllowed: () => {
        return '不支持该请求方式'
    }
}))


//监听端口
app.listen(3000, () => {
    console.log('应用已经启动，http://localhost:3000');
});