const Koa = require("koa");
const KoaRouter = require("koa-router");
const koaStaticCache = require("koa-static-cache");
const proxy = require('koa-server-http-proxy')
const http = require("http");

const app = new Koa();
const router = new KoaRouter();


app.use(koaStaticCache({
    prefix: '',
    dir: './public',
    gzip: true,
    dynamic: true
}));

// router.get('/getData', (ctx, next) => {
//     ctx.body = {
//         serverName: '3000'
//     }
// })

// 服务器手动代理
router.get('/getData', (ctx, next) => {
    return new Promise((resolve, reject) => {
        let req = http.request({
            method: 'get',
            hostname: 'localhost',
            port: 4000,
            path: '/getData'
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk.toString();
            });
            res.on('end', () => {
                console.log('数据：', data);
                ctx.body = data;
                resolve();
            });
        });

        req.write('');
        req.end();
    }) 
})

//服务器中间件代理
app.use(proxy('/api', {
    target: 'http://localhost:4000',
    pathRewrite: { '^/api': '' },
    changeOrigin: true
}))


app.use(router.routes());
app.listen(3000);