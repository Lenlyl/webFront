const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
let users = require('./data/users.json');
const fs = require('fs');

const app = new Koa();

// let users = [
//     { id: 1, username: 'zMouse' },
//     { id: 2, username: 'haizi' },
//     { id: 3, username: 'xiaorui' },
//     // { id: 4, username: 'mt' }
// ];

app.use(KoaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

let router = new KoaRouter();

router.get('/users', async (ctx, next) => {

    let n = ctx.request.query.n;

    // 当下，即使数据和上次某个客户端请求的数据之间没有任何的变化，那么服务端这里还是给返回了
    // 1、先看一下当前的数据和这个请求的客户端上次请求的数据是否有变化，判断当前的数据length与客户端当前传递过来的n之间是否一致
    // 2、如果没有，则挂起，等待数据有变化以后再返回
    // ctx.body = users;
    // if (n == users.length) {

    // }
    // console.log(n, users.length)
    // let a = 0;
    while (n == users.length) {
        // 优化：设定一个重试的次数或时间，如果次数或时间到了，则返回这次的数据（即使数据没有变化）
        console.log('数据没有变化，查询进入下一次');
        // 查询数据
        // 不要使用require，因为require会缓存
        // users = require('./data/users.json')
        users = JSON.parse(fs.readFileSync('./data/users.json').toString());
        // 程序挂起
        await sleep();
        // console.log(a++);
    }

    /**
     * 访问登录页
     *      https://ssl.ptlogin2.weiyun.com/ptqrlogin
     *      会返回一个状态（数据 isLogin），表示用户是否已经扫码了
     * 用户拿起手机，使用对应APP，打开摄像头扫码（前提是你在APP里面是登录的），扫码其实就得到了一个接口（发送请求 )
     *  https://qq.../appId=12312 => 更改对应isLogin=true
     * 
     * 
     */

    console.log('数据有变化');

    // 3、如果有则返回新数据 

    ctx.body = users;

});


app.use(router.routes());

app.listen(8888);

function sleep(t = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, t);
    });
}