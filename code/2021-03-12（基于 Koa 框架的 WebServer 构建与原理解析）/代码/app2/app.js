const Koa = require('koa');
// const static = require('./middleware/static');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('@koa/router');
const Nunjucks = require('nunjucks');
const fs = require('fs');
const KoaBody = require('koa-body');

const items = require('./data/items.json');

const app = new Koa();

// 处理通用的业务
// 1 静态资源
// app.use(static({
//     prefix: '/public'
// }));
app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    // 当静态资源修改的时候，里面能反馈
    dynamic: true
}))

// 2 动态资源
let router = new KoaRouter();

// app.use(async (ctx, next) => {
//     console.log(ctx.method);
//     await next();
// })

// app.use(KoaBody()); // 解析请求正文的数据，但是不推荐这样做，因为对于每次请求，koaBody都会去解析，影响性能，所以最好放在对应的具体路由中去处理

//router提供了一些与use类似的方法，router的内部会分析url，然后根据router函数的注册规则（比如当前请求的方法，请求url等去注册函数）
router.get('/', async (ctx, next) => {
    // ctx.body = '首页';

    ctx.body = Nunjucks.renderString(
        fs.readFileSync('./template/index.html').toString(),
        { items }
    );
});

router.get('/register', async (ctx, next) => {
    // ctx.body = '注册';
    ctx.body = Nunjucks.renderString(
        fs.readFileSync('./template/register.html').toString()
    );
});

// 一个路由是可以接收N个中间件函数的，执行从左到右
// KoaBody会把解析后的数据保存在 ctx.request.body
router.post('/register', KoaBody(), async (ctx, next) => {
    // 默认情况下，koa并不会去解析请求正文的内容（因为比较耗费时间）
    // console.log(ctx.request.body);
    let { username, password } = ctx.request.body;
    console.log('username', username);
    console.log('password', password);
    ctx.body = '注册成功';
})


router.get('/login', async (ctx, next) => {
    ctx.body = '登录';
});


// router 的中间件函数，需要调用 routes() 来获取
app.use(router.routes());



app.listen(8888);