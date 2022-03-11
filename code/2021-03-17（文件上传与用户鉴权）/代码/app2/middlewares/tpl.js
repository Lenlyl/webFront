const Nunjucks = require('nunjucks');
const fs = require('fs');

module.exports = function (options) {

    let opts = Object.assign({
        dir: ''
    }, options);

    return async function (ctx, next) {
        // 给当前的 ctx 对象下挂载一个 render 方法
        // 这个render实际上调用的就是nunjucks下的renderString方法
        ctx.render = function (tplName, data = {}) {

            let tplFile = opts.dir + '/' + tplName;
            // console.log('tplFile', tplFile);

            return Nunjucks.renderString(
                fs.readFileSync(tplFile).toString(),
                data
            );
        }

        await next();
    }
}