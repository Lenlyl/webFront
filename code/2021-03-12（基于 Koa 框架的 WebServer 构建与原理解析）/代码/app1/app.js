// require koa
const Koa = require('koa');

// 初始化一个 koa 对象（Application）
const app = new Koa();

// 把我们的具体业务逻辑代码（函数）使用 use 方法进行注册，注册到middleware中的函数将会被request事件所调用
app.use(async function (ctx, next) {

    console.log(ctx.request.url);
    console.log(ctx.request.ip);

    console.log('koa1');

    await next();

    console.log('koa1 - end');

    ctx.body = 'koa liyanlin';   // res.end('koa');
});
app.use(function () {
    return new Promise((resolve) => {
        setTimeout(function () {
            console.log('koa2');

            console.log('koa2 - end');

            resolve();
        }, 1000);
    })
});
// app.middleware = function() {}

// 使用 app 对象来创建一个 webserver
/**
 * http.createServer((req, res) => {})
 *
 * (new Http.Server().on('request', (req, res) => {}))
 */
app.listen(8888);