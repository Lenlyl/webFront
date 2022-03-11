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

    let userType = ctx.cookies.get('userType');

    if (userType != 'vip') {
        ctx.body = '你没有权限看这个数据';
    } else {
        ctx.body = '这是私密的内容';
    }

});

// url：验证（派发）用户身份数据
// kaikeba.com  vip.kaikeba.com
router.get('/login', async (ctx, next) => {
    // ctx.cookies.set('userType', 'vip', {
    //     maxAge: 1000
    // });
    ctx.cookies.set('userType', 'vip');
    ctx.cookies.set('username', 'zMouse');
    ctx.body = '登录成功';
});


app.use(router.routes());

app.listen(8888);


// http => (浏览器，迅雷，postman。。。。) => 渲染（保存）