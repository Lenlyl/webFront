const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

let users = [
    {
        id: 1,
        username: 'zMouse',
    },
    {
        id: 2,
        username: 'haizi'
    },
    {
        id: 3,
        username: 'xiaorui'
    }
];

const app = new Koa();

app.use(KoaStaticCache({
    pre: '/public',
    dir: './public'
}));

const router = new KoaRouter();


router.get('/', async (ctx, next) => {
    // 通过数据+模板 => 渲染 => html字符串 => 返回给客户端

    // let liString = users.map(user => {
    //     return `<li>${user.username}</li>`
    // }).join('');

    let htmlString = `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul></ul>

    <script>
        // 这段代码实际上给浏览器去执行
        // 调用浏览器提供的 ajax api 去发送请求
        console.log('ajax');
    </script>
</body>

</html>
    `;

    ctx.body = htmlString;
})

app.use(router.routes());


app.listen(8888);