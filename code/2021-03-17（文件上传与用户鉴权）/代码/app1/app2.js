const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const qs = require('qs');

const app = new Koa();

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
    // 我们可以通过 ctx.request.headers 获取当前请求的头信息
    console.log('headers', ctx.request.headers);

    // queryString 'a=1&b=2'
    // cookie 'a=1; b=2'
    let cookies = qs.parse(ctx.request.headers.cookie, '; ', '=');
    console.log('cookies', cookies);

    // 写一些业务逻辑代码控制返回的内容

    // 进行鉴权
    // 根据当前这次请求用户携带过来的数据（vip，normal）来处理下面的逻辑
    if (cookies.userType != 'vip') {
        ctx.body = '你没有权限看这个数据';
    } else {
        ctx.body = '这是私密的内容';
    }

});

// url：验证（派发）用户身份数据
router.get('/login', async (ctx, next) => {
    // ctx.body = 'vip';
    ctx.set('Set-Cookie', 'userType=vip');
    ctx.body = '登录成功';
});


app.use(router.routes());

app.listen(8888);


// http => (浏览器，迅雷，postman。。。。) => 渲染（保存）