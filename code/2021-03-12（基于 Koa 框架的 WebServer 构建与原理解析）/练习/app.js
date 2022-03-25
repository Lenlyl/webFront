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

app.keys = ['liyanlin', '1992'];

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

    const token = ctx.cookies.get('token', {
        signed: true
    });
    if (!token) {
        ctx.body = '<a href="/signin">未登录或登录已过期。 点击去登录页</a>';
        return;
    }

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

router.get('/signin', async (ctx, next) => {

    ctx.body = ctx.render('signin.html');
})

router.post('/signin', koaBody(), async (ctx, next) => {

    const { username, password } = ctx.request.body;

    if (!username || !password) {
        ctx.body = '<a href="/signin">用户名或密码不能为空。 点击去登录页</a>';
        return;
    }

    const [[user]] = await ctx.state.conn.query(
        'SELECT * FROM `users` WHERE username = ? limit 1',
        [username]
    )

    if (!user) {
        ctx.body = '<a href="/signin">用户名不存在，请重新输入。 点击去登录页</a>';
    } else if (user && user.password == password) {
        ctx.cookies.set('token', 'vip', {
            signed: true
        })
        ctx.body = '<a href="/">登录成功！去首页</a>';
    } else {
        ctx.body = '<a href="/signin">密码错误，请重新输入。 点击去登录页</a>';
    }
})

router.get('/signup', async (ctx, next) => {

    ctx.body = ctx.render('signup.html');
})

router.post('/signup', koaBody(), async (ctx, next) => {

    const { username, password } = ctx.request.body;
    console.log(username, password);

    if (username == '' || password == '') return ctx.body = ctx.render('signup.html');

    //存储评论到数据库
    let [rs] = await ctx.state.conn.query(
        "insert into `users` (`username`, `password`, `created_time`) values (?, ?, ?)",
        [username, password, Date.now()]
    );
    console.log('rs', rs);

    ctx.body = '<a href="/signin">注册成功！去登录</a>'
})

// 返回一个头像上传的页面
router.get('/header', async (ctx, next) => {
    ctx.body = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--如果我们提交的数据不是文本类型，这个时候enctype一定要设置成二进制格式-->
    <form method="post" enctype="multipart/form-data">
        <p>用户名：<input type="input" name="username" /></p>
        <p>密码：<input type="password" name="password" /></p>
        <p>头像1：<input type="file" name="avatar1" multiple  /></p>
        <!--<p>头像2：<input type="file" name="avatar2" /></p>-->
        <p><button>上传</button></p>
    </form>
</body>

</html>
    `
});

router.post('/header', koaBody({
    // 只表示我解析formdata这个格式数据中的纯文本类型，并且这个数据解析统一放到了 ctx.request.body 中
    multipart: true,
    // 解析二进制文件流数据
    // koa-body 使用了 node-formidable 库来对二进制文件数据流进行操作，解析并保存到服务器
    formidable: {
        uploadDir: './public/header',
        keepExtensions: true
    }
}), async (ctx, next) => {

    // console.log(ctx.request.body);
    // console.log(ctx.request.files);

    const { username, password } = ctx.request.body;
    const { path } = ctx.request.files;

    if (!username || !password) {
        ctx.body = '<a href="/signin">用户名或密码不能为空。 点击去登录页</a>';
        return;
    }

    const [[user]] = await ctx.state.conn.query(
        'SELECT * FROM `users` WHERE username = ? limit 1',
        [username]
    )

    if (!user) {
        ctx.body = '<a href="/signin">用户名不存在，请重新输入。 点击去登录页</a>';
    } else if (user && user.password == password) {

        let [rs] = await ctx.state.conn.query(
            `update users set header_url = ? where username = ?`,
            [path, username]
        );
        console.log('rs', rs);

        ctx.cookies.set('token', 'vip', {
            signed: true
        })
        ctx.body = '上传成功';
    } else {
        ctx.body = '<a href="/signin">密码错误，请重新输入。 点击去登录页</a>';
    }
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