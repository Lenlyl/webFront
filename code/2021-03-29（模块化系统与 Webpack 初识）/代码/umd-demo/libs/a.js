

// // module.exports.hello = hello;

// function loadModule(factory) {
//     if (typeof module === "object" && typeof module.exports === "object") {
//         // Node, CommonJS-like
//         module.exports = factory();
//     }
//     else if (typeof define === "function" && define.amd) {
//         // AMD 模块环境下
//         define(factory);
//     } else {
//         window.kkb = factory();
//     }
// }

// loadModule(function () {
//     function hello() {
//         console.log('hello');
//     }

//     return {
//         hello
//     }
// });


(function (context, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        // Node, CommonJS-like
        module.exports = factory();
    }
    else if (typeof define === "function" && define.amd) {
        // AMD 模块环境下
        define(factory);
    } else {
        context.kkb = factory();
    }
})(this, function () {
    function hello() {
        console.log('hello');
    }

    return {
        hello
    }
});