/**
 * 使用node语法以及其提供的一些库函数去实现一个webserver
 *
 *  webserver
 *      针对网络进行编程（网卡）
 *
 *  - 启动一个程序
 *  - 监听网卡（主机/ip + 端口）
 *  - 处理请求/数据
 *  - 响应数据
 */

/**
 * 使用 http 模块创建一个app
 */
 const mime = require('./mime.json');

const http = require('http');
const fs = require('fs');


// new http.Agent();
// new http.Server();

/**
 * 创建一个用于处理webß请求的app
 * 这个对象会处理监听到的请求和数据
 */
const app = new http.Server();

/**
 * 给 app 的 request 事件绑定一个函数，用来处理每一次请求
 * request事件函数会在每次请求执行的时候注入两个参数
 *  - IncomingMessage
 *      - 该对象提供了一个请求的时候所携带的数据信息：包括请求所使用的协议、端口、路径等等，该对象会在 request 事件回调函数的第一个参数中注入
 *  - ServerResponse
 *      - 提供了响应数据的一些api
 */
// console.dir({ a: 1, b: 2, c: { x: 100, y: { aa: 1 } } }, {
//     depth: 1
// });
app.on('request', (req, res) => {
    // console.log('req', req);
    // console.dir(req, { depth: 1 });
    // 输出在服务端控制台
    console.log('有人发送了一个http请求');
    // console.dir(req, 1); //打印层级

    //请求地址后缀
    let reg = /\.\S+/;
    let regArr = req.url.match(reg)
    let suffix = regArr!=null&&regArr!=undefined ? regArr[0] : null;
    let mm = mime[suffix];
    if(suffix) res.setHeader('Content-Type', mm);

    // 当前请求的url console.log('url', req.url);
    // 根据url规则去返回不同的资源数据，至于有哪些url会返回哪些数据，取决于当前这个app的业务逻辑的处理
    if (req.url === '/' || req.url === '/index.html') {
        let content = fs.readFileSync('./public/index.html');
        res.end(content.toString());
    }

    if (req.url === '/css/index.css') {
        let content = fs.readFileSync('./public/css/index.css');
        res.end(content.toString());
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html;charset="utf-8')
    res.end('<h1>404 页面不存在s</h1>');
})

/**
 * 调用 app 对象下的一个 listen 方法，来监听指定的这台机器的ip+端口
 */
app.listen(8889);   // 0 - 65535
