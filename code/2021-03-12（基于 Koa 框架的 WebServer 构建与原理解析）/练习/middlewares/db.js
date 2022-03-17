const mysql = require('mysql2/promise');


module.exports = function () {

    return async (ctx, next) => {

        if(!ctx.state.conn){
            var connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'liyanlin',
                database: 'mall'
            });
    
            ctx.state.conn = connection;
        }

        await next();
    }
}