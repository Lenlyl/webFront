const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');

const app = new Koa();

// 设置cookie加密签名字符串的时候所使用秘钥
// 不是加密cookie数据，而是用来保证派发的对应cookie是我后端发出的，没有经过修改的
app.keys = ['kkb'];

// 静态资源代理
app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    // 启用http传输压缩
    gzip: true,
    // 动态的监听我们的文件变化
    dynamic: true
}));

const router = new KoaRouter();

router.get('/', async (ctx, next) => {

    let userType = ctx.cookies.get('userType', {
        // 验证当前这个cookie对应的签名是否正确
        signed: true
    });

    if (userType != 'vip') {
        ctx.body = '你没有权限看这个数据';
    } else {
        ctx.body = '这是私密的内容';
    }

});

// 通过get请求/login返回一个页面（包含了登录表单）
router.get('/login', async (ctx, next) => {
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
    <!--enctype：当我们提交表单的时候，浏览器会自动发送一个method设置的类型的请求，同时把请求头中的content-type的设置为：enctype 中指定的值，这样后端就可以通过请求头中的content-type知道当前的数据是什么格式的-->
    <form method="post" enctype="application/x-www-form-urlencoded">
        <p>用户名：<input type="input" name="username" /></p>
        <p>密码：<input type="password" name="password" /></p>
        <p><button>登录</button></p>
    </form>
</body>

</html>
    `
})

// url：验证（派发）用户身份数据，根据提交过来的数据进行用户验证
router.post('/login', KoaBody(), async (ctx, next) => {

    let { username, password } = ctx.request.body;

    if (username !== 'zmouse' || password !== '123') {
        ctx.body = '用户名或密码错误了';
        return;
    }

    ctx.cookies.set('userType', 'vip', {
        // 要对当前这个cookie进行签名
        signed: true
    });
    ctx.cookies.set('username', 'zMouse');
    ctx.body = '登录成功';
});


// 返回一个头像上传的页面
router.get('/avatar', async (ctx, next) => {
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

router.post('/avatar', KoaBody({
    // 只表示我解析formdata这个格式数据中的纯文本类型，并且这个数据解析统一放到了 ctx.request.body 中
    multipart: true,
    // 解析二进制文件流数据
    // koa-body 使用了 node-formidable 库来对二进制文件数据流进行操作，解析并保存到服务器
    formidable: {
        uploadDir: './public/avatar',
        keepExtensions: true
    }
}), async (ctx, next) => {
    console.log(ctx.request.body);
    console.log(ctx.request.files);

    ctx.body = '上传成功';
});



app.use(router.routes());

app.listen(8888);

