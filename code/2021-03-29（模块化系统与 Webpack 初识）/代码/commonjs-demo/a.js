let v = 1;

// 可以把模块内部的数据通过模块内置对象 module.exports 的属性进行导出
module.exports.v = v;

console.log('module', module);