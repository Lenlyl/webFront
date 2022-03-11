// 使用 requirejs 提供的 define 方法来定义模块
define(['./js/a.js'], function (a) {
    console.log('index.js', a);
    a.hello();
});