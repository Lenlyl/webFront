// 导入mysql2的模块
const mysql = require('mysql2/promise');

module.exports = function () {
    return async function (ctx, next) {

        if (!ctx.state.conn) {

            ctx.state.conn = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '12345678',
                database: 'mall16'
            });
        }

        await next();
    }
}