const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const Nunjucks = require('nunjucks');
const fs = require('fs');

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

// 路由配置
const router = new KoaRouter();

router.get('/', async (ctx, next) => {
    let content = Nunjucks.renderString(
        // 模板文件
        fs.readFileSync('./template/index.html').toString(),
        // 向模板中注入的数据
        {
            title: '开课吧'
        }
    );
    ctx.body = content;
})

app.use(router.routes());

app.listen(8888);