const mime = require('./mime.json');
const categories = require('./mall/data/categories.json');
const items = require('./mall/data/items.json');
const nunjucks = require('./nunjucks');


const http = require('http');
const fs = require('fs');

const app = new http.Server();

app.on('request', (req, res) => {

    // 根据请求的url中文件的后缀去获取对应mime类型
    let lastPointIndex = req.url.lastIndexOf('.');
    let suffix = req.url.substring(lastPointIndex);
    let mm = mime[suffix];
    res.setHeader('content-type', mm);

    if(req.url.startsWith('/mall/template')){

        /** eg: /mall.template/index.html */
        // let content = fs.readFileSync(`.${req.url}`);
        let content = nunjucks.renderString(fs.readFileSync(`.${req.url}`).toString(), { categories, items });
        res.end(content);
        return;

    }else if(req.url.startsWith('/mall/data/images')){

        let content = fs.readFileSync(`.${req.url}`);
        res.end(content);
        return;
    }


    //如果访问的地址不存在，返回404
    res.setHeader('content-type', 'text/html;charset="utf-8"');
    res.statusCode = 404;
    res.end('<h1>您访问的页面不存在！</h1>');
});

app.listen(8080);