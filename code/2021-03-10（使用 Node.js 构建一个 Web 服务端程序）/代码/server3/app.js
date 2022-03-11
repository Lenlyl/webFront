const http = require('http');
const fs = require('fs');
const mime = require('./mime.json');
const categories = require('./data/categories');
const nunjucks = require('./nunjucks');

// let c = nunjucks.renderString('<h1>我的名字：{{name}}</h1>', { name: 'zMouse' });
// console.log('c', c);

const app = new http.Server();
let n = 3;

app.on('request', (req, res) => {

    if (req.url.startsWith('/public')) {
        let content = fs.readFileSync(`.${req.url}`);


        let lastPointIndex = req.url.lastIndexOf('.');
        let suffix = req.url.substring(lastPointIndex);
        let mm = mime[suffix];

        res.setHeader('content-type', mm);
        res.end(content.toString());
    }

    // 还有一些资源需要根据不同的业务逻辑去处理
    if (req.url === '/my') {
        res.setHeader('content-type', 'text/html;charset="utf-8"');
        if (n > 0) {
            n--;
            res.end('这是我的私密数据');
        } else {
            res.statusCode = 401;
            res.end('你已经没有权限访问了');
        }
        return;
    }

    if (req.url === '/categories') {
        res.setHeader('content-type', 'text/html;charset="utf-8"');
        // res.end(JSON.stringify(categories));

        // let lis = categories.map(category => {
        //     return `
        //         <li>${category.name}</li>
        //     `
        // }).join('');

        // console.log('lis', lis);

        // res.end(`
        //     <ul>
        //         ${lis}
        //     </ul>
        // `);


        let content = nunjucks.renderString(fs.readFileSync('./template/categories.html').toString(), { categories });
        res.end(content);
        return;
    }

    res.setHeader('content-type', 'text/html;charset="utf-8"');
    res.statusCode = 404;
    res.end('<h1>页面不存在！</h1>');
})

app.listen(8888);
