const http = require('http');
const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const socketIo = require("socket.io");
const jsonwebtoken = require('jsonwebtoken');


let key = 'kkb';

let users = [
    {
        id: 1,
        username: 'zmouse'
    },
    {
        id: 2,
        username: 'haizi'
    }
];

const app = new Koa();

// 使用 http 模块创建一个服务器对象，用来替代 Koa 中内部创建的 Server
const httpServer = http.createServer(app.callback());

app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

let router = new KoaRouter();

router.get('/login', async (ctx) => {
    let username = ctx.request.query.username;

    let user = users.find(u => u.username == username);

    if (!user) {
        ctx.status = 401;
        ctx.body = '登录失败';
    }

    let token = jsonwebtoken.sign(user, key);
    ctx.set('authorization', token);

    ctx.body = user;
})

app.use(router.routes());

const ioServer = socketIo(httpServer);

let map = new Map();

// 监听ioServer的connection事件
ioServer.on('connection', (socket) => {

    try {
        // socket：
        // console.log('websocket');
        // console.log(socket.handshake.auth);

        let token = socket.handshake.auth.token;
        // console.log(auth);
        let user = jsonwebtoken.verify(token, key);
        // console.log(user);
        map.set(user, socket);


        socket.on('message', data => {
            // console.log('data', data);

            // data.to = {id: 1, username: 'zMouse'}
            // if (data.to) {
            //     // 私聊
            //     let c = map.get(data.to);
            //     c.emit('message', data.data);
            // }

            let sendData = {
                socketId: socket.id,
                datetime: Date.now(),
                data,
                user
            };

            // 把这个消息处理一下，然后返回给客户端
            socket.emit('message', sendData);
            // 再把这个数据全部广播给其它socket（广播是不包含当前socket）
            socket.broadcast.emit('message', sendData);
        });
    } catch (e) {
        // 断开客户端的socket请求
        socket.disconnect();
    }


});

httpServer.listen(8888);