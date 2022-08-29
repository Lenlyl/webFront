var title = 'typescripte';
// let str : string = 1; //不能将类型“number”分配给类型“string”
var num = 10;
var bool = true;
var nul;
//tsconfig.json 增加配置  "strictNullChecks": true
// nul = null; //不能将类型“null”分配给类型“number”。
nul = 100;
nul.toFixed(1);
var div = document.getElementById('div');
if (div) {
    // div.style
}
var lyl = {
    username: 'lyl',
    age: 30,
    height: 172
};
var arr1 = ['a', '1', 'b'];
// arr1.push(1);
var arr2 = [1, 2, 3];
arr2.push(4);
// arr2.push('a'); 
//元组
var arr3 = [1, 'abc', true];
arr3.push('bbb');
// arr3.push({a: 123})//必须是以上元组类型中的某一种类型
var STATUS;
(function (STATUS) {
    STATUS[STATUS["OK"] = 200] = "OK";
    STATUS[STATUS["ERROR"] = 404] = "ERROR";
    STATUS[STATUS["NULL"] = 405] = "NULL";
})(STATUS || (STATUS = {}));
console.log(STATUS.NULL);
function fun(a) {
    a++;
    return undefined;
}
var f = fun('223');
function fun2() {
    throw new Error('error');
}
var a;
var c = 'kk';
var b = 1;
// let ff : func = {
//     width: 100,
//     height: 100,
//     age: 30,
//     // fn: function(a:number) {
//     //     return a++
//     // }
// }
function css(el, stl) {
    return el.style.width;
}
function fun3(a) {
    return a;
}
var fun4 = function (a) {
    return a;
};
var fun5 = function (b) {
    return b;
};
var fun6 = function (c) {
    return c;
};
