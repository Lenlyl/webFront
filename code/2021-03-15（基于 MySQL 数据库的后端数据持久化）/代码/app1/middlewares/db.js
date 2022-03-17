// 导入mysql2的模块
const mysql = require('mysql2/promise');
// 数据库链接成功后返回的对象
// let conn = null;

// 链接数据库 mysql => 基于网络的数据库
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'test'
// });


module.exports = function () {
    return async function (ctx, next) {
        // 链接数据库
        // 虽然我们可以给 ctx 上挂载很多我们需要在不同的中间件中共享的一些数据对象，但是这种做法并不推荐，因为会破坏 ctx 这个对象上的一些数据
        // koa 框架为我们提供了一个专门的属性，用来存放用户扩展的数据
        // ctx.state
        if (!ctx.state.conn) {
            // 需要链接数据库

            // 备注：课上临时使用的 docker 中 mysql，配置如下，你们根据自己数据库安装的信息进行配置
            // 如遇Error: getaddrinfo ENOTFOUND localhost
            // 在host文件中配置 127.0.0.1 localhost (使用工具SwitchHosts)
            ctx.state.conn = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'liyanlin',
                port: 3306,
                database: 'mall'
            });
            console.log('conn', ctx.state.conn);
        }

        await next();
    }
}