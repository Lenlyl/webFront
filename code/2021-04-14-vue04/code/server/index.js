const Koa = require("koa");
const serve = require("koa-static");
const fs = require("fs");

const app = new Koa();

app.use(serve(__dirname + "/static"));

app.use((ctx) => {
  console.log("heihei");
  // 我们应该把 index.html 返回给前端
  const htmlTemplate = fs.readFileSync("./static/index.html");
  //   Content-Type: text/html; charset=utf-8
  ctx.set("context-type", "text/html");
  ctx.body = htmlTemplate.toString();
});

app.listen(8080, () => {
  console.log("open server localhost:8080");
});
