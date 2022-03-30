const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const db = require('./middlewares/db');
const config = require('./config');
const auth = require('./middlewares/auth');
const path = require('path');

const app = new Koa();

app.keys = config.auth.keys;

app.use(async (ctx, next) => {

    ctx.set('Access-Control-Allow-Origin', 'http://localhost:9999');
    ctx.set('Access-Control-Allow-Credentials', 'true');

    await next();
});

app.use(async (ctx, next) => {

    // console.log(ctx.method)
    if (ctx.method.toUpperCase() === 'OPTIONS') {
        ctx.set('Access-Control-Allow-Methods', '*');
        ctx.set('Access-Control-Allow-Headers', 'content-type');
        ctx.body = '';
        return;
    }

    await next();
});

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

    let limit = ctx.request.query.limit || 4;  // 每页显示的数据条数
    let page = ctx.request.query.page || 1;   // 当前页
    let offset = (page - 1) * limit;

    let [[{ count }]] = await ctx.state.conn.query(
        "select count(*) as count from `items`"
    );

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

// 商品详情
router.get('/item/:id', async (ctx, next) => {
    let { id } = ctx.request.params;

    let [[item]] = await ctx.state.conn.query(
        "select * from `items` where `id`=?",
        [id]
    );

    ctx.body = item;
})

// 用户登录
router.post('/signin', KoaBody(), async (ctx, next) => {
    let { username, password } = ctx.request.body;

    let [[user]] = await ctx.state.conn.query(
        "select * from `users` where `username`=?",
        [username]
    );

    if (!user || user.password != password) {
        ctx.throw(401, {
            code: 10001,
            message: '用户不存在或者密码错误'
        })
    }

    let userInfo = {
        id: user.id,
        username: user.username
    }

    ctx.cookies.set('auth', JSON.stringify(userInfo), {
        signed: true
    });


    ctx.body = userInfo;
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
    console.log('file', avatar)

    // ctx.body = '/' + avatar.path;

    let [{ affectedRows }] = await ctx.state.conn.query(
        "update `users` set avatar=? where `id` = ?",
        [avatar.name, 1]
    );

    console.log('rs', affectedRows);

    ctx.body = {
        id: 1,
        path: avatar.name
    }
});

// 获取指定商品下的所有评论
router.get('/comments/:id', async (ctx, next) => {

    let { id: itemId } = ctx.request.params;

    let limit = 4;  // 每页显示的数据条数
    let page = ctx.request.query.page || 1;   // 当前页
    let offset = (page - 1) * limit;

    let [[{ count }]] = await ctx.state.conn.query(
        "select count(*) as count from `comments`"
    );

    let pages = Math.ceil(count / limit);

    let [comments] = await ctx.state.conn.query(
        "select * from `comments` limit ? offset ?",
        [limit, offset]
    );

    ctx.body = {
        comments,
        count,
        page,
        pages
    };
});

// 提交评论
router.post('/comment/:id', auth(), KoaBody(), async (ctx, next) => {
    let { id: itemId } = ctx.request.params;
    let { content } = ctx.request.body;
    let { id: userId } = ctx.state.user;

    itemId = parseInt(itemId);
    content = content && content.trim();

    if (!itemId || !content) {
        ctx.throw(400, {
            code: -2,
            message: '参数错误'
        });
    }

    const createdAt = Date.now();

    let [{ insertId }] = await ctx.state.conn.query(
        "insert into `comments` (`user_id`, `item_id`, `content`, `created_at`) values (?, ?, ?, ?)",
        [userId, itemId, content, createdAt]
    );

    ctx.body = {
        id: insertId,
        userId,
        itemId,
        content,
        createdAt
    }
})


app.use(router.routes());

app.listen(8888);