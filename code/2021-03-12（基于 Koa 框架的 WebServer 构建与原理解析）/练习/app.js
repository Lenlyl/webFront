const Koa = require('koa');
const app = new Koa();
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const Nunjucks = require('nunjucks');
const fs = require('fs');
const KoaBody = require('koa-body');

//数据
const categories = require('./data/categories.json')
const items = require('./data/items.json');
const koaBody = require('koa-body');

//1.静态资源
app.use(KoaStaticCache({
    prefix: '/static',
    dir: './static',
    dynamic: true,
    gzip: true
}))


//2.动态资源
var router = new KoaRouter();

router.get('/index', async (ctx, next) => {

    ctx.body = Nunjucks.renderString(fs.readFileSync('./html/index.html').toString(), { categories, items });
})

router.get('/detail', koaBody(), async (ctx, next) => {
    let url = ctx.request.url;
    let categoryId = getUrlParam(url, 'categoryId');
    let itemId = getUrlParam(url, 'id');
    let categoryName = ['手机', '笔记本', '电脑'][categoryId - 1];
    var itemDetail = items.find(e => e.id == itemId && e.category_id == categoryId);
    itemDetail.categoryName = categoryName;
    ctx.body = Nunjucks.render('./html/detail.html', { itemDetail })
})

router.post('/detail', koaBody(), async (ctx, next) => {

    const { comment } = ctx.request.body;
    console.log('评论内容：' + comment);

    var itemDetail = items[Math.random() * items.length - 1];
    itemDetail.categoryName = '手机';
    ctx.body = Nunjucks.render('./html/detail.html', { itemDetail })
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
// app.use(function () {
//     return new Promise((resolve) => {
//         setTimeout(function () {
//             console.log('koa2');

//             console.log('koa2 - end');

//             resolve();
//         }, 2000);
//     })
// });


//监听端口
app.listen(3000, () => {
    console.log('应用已经启动，http://localhost:3000');
});


//正则取url中参数
const getUrlParam = (url, name) => {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    if (!match) {
        return null;
    }
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}