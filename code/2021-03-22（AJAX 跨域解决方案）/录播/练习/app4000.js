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
    ctx.body = {
        name:"李四 4000",
        age:4000
    }
})

app.use(router.routes());

app.listen(4000);