const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const http = require('http');

const app = new Koa();

app.use(KoaStaticCache({
    prefix: '',
    dir: './public',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();

// router.get('/data', async (ctx, next) => {
//     ctx.body = [1, 2, 3];
// });

// 跨域问题：浏览器的同源策略限制，但是其他不一定有，很多的语言都有基于网络的编程，它既可以监听请求，也可以发送请求，而且一般默认是没有所谓的同源策略的
// 我们可以基于node提供http模块来发送请求
router.get('/data', async (ctx, next) => {

    // 使用发送一个http请求到真正的服务器接口上

    // 后端代理
    // [server1.ajax => server1] => server2 , server1 就是代理
    return new Promise((resolve, reject) => {
        let req = http.request({
            // method: 'get',
            hostname: 'localhost',
            port: 8888,
            path: '/data'
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

});

app.use(router.routes());

app.listen(9999);