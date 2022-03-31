const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");
let app = new Koa();
let router = new Router();

app.use(static(__dirname+"/static"));

router.get("/",(ctx,next)=>{
    ctx.body = "hello";
})

router.get("/getAjax",(ctx,next)=>{
    
    console.log('getAjax 4000 请求了', ctx.query.cb);

    // ctx.body = {
    //     name:"李四 4000",
    //     age:4000
    // }

    // ctx.body = `${ctx.query.cb}(${4000})`

    let obj = {
        name:"李四 4000",
        age:40
    }
    ctx.body = `${ctx.query.cb}(${JSON.stringify(obj)})`
})

app.use(router.routes());

app.listen(4000);