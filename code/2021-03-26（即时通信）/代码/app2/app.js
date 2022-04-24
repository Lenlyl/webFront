const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
let users = require('./data/users.json');
const fs = require('fs');

const app = new Koa();

app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

let router = new KoaRouter();

router.get('/users', async (ctx, next) => {

    let n = ctx.request.query.n;

    while (n == users.length) {
        console.log('数据没有变化，查询进入下一次');
        users = JSON.parse(fs.readFileSync('./data/users.json').toString());
        await sleep();
    }

    console.log('数据有变化');

    ctx.set('content-type', 'text/event-stream');

    // ctx.body = `event: ping\ndata: {"time": "${new Date()}"}\n\n`
    // ctx.body = JSON.stringify(users);
    let resData = JSON.stringify(users);

    // \n
    ctx.body = `event: ping\ndata: ${resData}\n\n`;

});


app.use(router.routes());

app.listen(8888);

function sleep(t = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, t);
    });
}