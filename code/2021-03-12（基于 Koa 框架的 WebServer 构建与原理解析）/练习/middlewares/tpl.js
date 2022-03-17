const Nunjucks = require('nunjucks');
const fs = require('fs');

module.exports = function (option) {

    let opt = Object.assign({
        dir: ''
    }, option);

    return async function (ctx, next) {

        ctx.render = (tplName, data = {}) => {
            let tplFile = opt.dir + '/' + tplName;
            return Nunjucks.renderString(
                fs.readFileSync(tplFile).toString(),
                data
            );
        }

        await next();
    }
}