import './b.js';
let a = 10;
// console.log(a);
//export 导出多个
export {a};
export let b = 20;
let obj = {
    myname:"张三",
    fn(){
        console.log("fn");
    }
}
// 导出一个
// export default obj;
// export default obj;
export {obj as default};
