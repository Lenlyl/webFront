module.exports = function () {
    // 授权验证中间件
    return async function (ctx, next) {
        let user = null;
        try {
            user = ctx.cookies.get('auth', {
                signed: true,
            });
            ctx.state.user = JSON.parse(user);
        } catch (e) {
            ctx.throw(401, {
                code: -1,
                message: '你还没有登录'
            });
        }
        await next();
    }
}