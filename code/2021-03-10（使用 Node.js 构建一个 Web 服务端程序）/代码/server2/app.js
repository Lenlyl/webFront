const http = require('http');
const fs = require('fs');
const mime = require('./mime.json');

const app = new http.Server();

app.on('request', (req, res) => {
    // 规则：url中只要以 /public 开头，那么我就去指定的目录（./public/）下去查找对应的文件
    // /public/index.html => ./public/index.html
    // /public/css/index.css => ./public/css/index.css
    if (req.url.startsWith('/public')) {
        let content = fs.readFileSync(`.${req.url}`);

        // 根据请求的url中文件的后缀去获取对应mime类型
        // /public/css/index.css
        let lastPointIndex = req.url.lastIndexOf('.');
        console.log('lastPointIndex', lastPointIndex);
        let suffix = req.url.substring(lastPointIndex);
        console.log('suffix', suffix);
        let mm = mime[suffix];
        console.log('mm', mm);

        res.setHeader('content-type', mm);
        res.end(content.toString());
        return;
    }

    // 如果请求的url没有命中任何资源，那么我们可以返回一个对应的错误信息
    res.setHeader('content-type', 'text/html;charset="utf-8"');
    // res.statusCode = 301;
    // res.setHeader('Location', '/login');
    res.statusCode = 404;
    res.end('<h1>页面不存在！</h1>');
})

app.listen(8888);
