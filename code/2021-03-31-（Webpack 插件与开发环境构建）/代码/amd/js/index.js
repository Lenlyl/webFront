//1依赖数组方法
// define([
//     'a'
// ], function(require) {
//     console.log(require);
//     require.a();
// });

//2
define(require => {
    const a = require('a');
    console.log(a);
    a.a(); 
})