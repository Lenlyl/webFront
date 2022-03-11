/**
 * 一个文件就会在执行过程中拥有一个独立的作用域（模块作用域）
 * 同时每一个文件会自动拥有一个模块内置对象：module
 *  模块内部数据可以通过 module.exports 导出
 *  在模块内部还有一个方法：require 可以导入外部模块
 *  require 方法返回其实就是被引用模块的 module.exports
 * 
 *  node中的模块类型
 *      - 单文件模块
 *      - 目录模块
 *          - 如果导入的是目录，那么自动会加载模块中的index.js
 *          - 如果该目录中存在 package.json 那么加载的就是 package.json 中 main 选项指定的文件模块
 *      - node_modules模块（第三方模块）
 *          - 使用 npm、yarn 安装的第三方模块目录模块存放的目录
 *          - 文件模块、本地文件夹模块在 require 一定要使用 相对路径
 */

// let aModule = require('./a');
// let db = require('./database/index');
let db = require('./database');
let kkb = require('kkb');

let v = 1;


// console.log('module', module);

// console.log('aModule', aModule);


db.query();
kkb.query();
