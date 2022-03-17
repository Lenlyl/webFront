const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const tpl = require('./middlewares/tpl');
const { resolve } = require('path');
const db = require('./middlewares/db');


// 把数据存储在应用程序的变量中，这种做法是临时存储，数据是存储内存中，如果应用退出，或者重载，那么这个内存中存放的数据就会一同消失，这种数据并非持久化的
// let categories = [];

// 创建app
const app = new Koa();

// 静态资源处理
app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

// 数据库链接
app.use(db());

// 路由配置
const router = new KoaRouter();

// 模板引擎中间件
app.use(tpl({
    dir: resolve(__dirname, 'template')
}));

router.get('/', async (ctx, next) => {

    // sql 语句
    let [categories] = await ctx.state.conn.query(
        "select * from `categories`"
    );
    console.log('categories', categories);

    // 根据 categories 进行查询，并把查询的结果存储在 categories 的新数据库 items 中
    for (let i = 0; i < categories.length; i++) {
        let [items] = await ctx.state.conn.query(
            "select * from `items` where `category_id`=? limit 5",
            [categories[i].id]
        );
        categories[i].items = items;
    }
    // console.dir(categories, {
    //     depth: 6
    // });

    ctx.body = ctx.render('index.html', {
        categories
    });
});

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
    let [categories] = await ctx.state.conn.query(
        "select * from `categories`"
    );

    // 查询出当前想要看的分类下的所有数据
    let id = ctx.request.params.id;


    let [[item]] = await ctx.state.conn.query(
        "select * from `items` where `id`=? limit 1",
        [id]
    );
    // console.log('item', item);

    // 根据当前的 category 的 id 获取所有对应的 comments 并在模板中显示

    ctx.body = ctx.render('detail.html', {
        categories,
        item
    });
});

// 处理提交的评论
router.post('/comment', KoaBody(), async (ctx, next) => {
    let { id, content } = ctx.request.body;
    // console.log('content', content);

    // 把提交的数据存储到数据 comments 表中
    let [{ insertId }] = await ctx.state.conn.query(
        "insert into `comments` (`item_id`, `content`, `created_time`) values (?, ?, ?)",
        [id, content, Date.now()]
    );
    // console.log('rs', rs);

    ctx.body = '评论成功';
})

app.use(router.routes());

app.listen(3000);