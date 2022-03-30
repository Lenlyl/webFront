const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const proxy = require('koa-server-http-proxy');

const app = new Koa();

app.use(proxy('/api', {
    // http://localhost:8888/data
    target: 'http://localhost:8888',
    pathRewrite: { '^/api': '' },
    changeOrigin: true
}))

app.use(KoaStaticCache({
    prefix: '',
    dir: './public',
    gzip: true,
    dynamic: true
}));


app.listen(9999);