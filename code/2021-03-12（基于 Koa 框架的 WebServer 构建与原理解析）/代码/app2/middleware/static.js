const fs = require('fs');
const path = require('path');
const mime = require('./mime.json');

module.exports = function (options) {
    return async function (ctx, next) {
        let url = ctx.request.url;
        if (ctx.request.url.startsWith(options.prefix)) {
            let filepath = path.resolve(__dirname, '..' + url);
            // console.log(filepath);
            let content = fs.readFileSync(filepath);

            let lastPointIndex = url.lastIndexOf('.');
            let suffix = url.substring(lastPointIndex);
            let mm = mime[suffix];

            // res.setHeader('content-type', mm);
            // res.end(content.toString());

            ctx.set('content-type', mm);
            ctx.body = content;
        } else {
            // 如果当前请求的不是静态资源，则继续执行后面的中间件
            await next();
        }
    }
}