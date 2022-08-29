let title : string = 'typescripte';
// let str : string = 1; //不能将类型“number”分配给类型“string”
let num :  number = 10;

let bool : boolean = true;

let nul : number;
//tsconfig.json 增加配置  "strictNullChecks": true
// nul = null; //不能将类型“null”分配给类型“number”。
nul = 100;
nul.toFixed(1);

let div = document.getElementById('div');
if(div){
    // div.style
}

interface Person {
    username: string,
    age: number,
    height: number
}

let lyl : Person = {
    username: 'lyl',
    age: 30,
    height: 172
}

let arr1 : Array<string> = ['a', '1', 'b'];
// arr1.push(1);

let arr2 : number[] = [1,2,3];
arr2.push(4);
// arr2.push('a'); 

//元组
let arr3 : [number, string, boolean] = [1, 'abc', true];
arr3.push('bbb');
// arr3.push({a: 123})//必须是以上元组类型中的某一种类型

enum STATUS {
    OK = 200,
    ERROR = 404,
    NULL 
}
console.log(STATUS.NULL);

function fun(a: any) : void {
    a++;
    return undefined;
}
let f = fun('223');

function fun2() : never {
    throw new Error('error');
}

let a : any;

let c : unknown = 'kk';
let b : number = 1;
// b = c; //不能将类型“unknown”分配给类型“number”

interface func {
    width: number,
    height: number,
    fn(a: number): number
}
interface func {
    width: number,
    age: number,
    fn(a: string): string
}
// let ff : func = {
//     width: 100,
//     height: 100,
//     age: 30,
//     // fn: function(a:number) {
//     //     return a++
//     // }
// }

function css(el: HTMLElement, stl: string) : string {
    return el.style.width;
}

function fun3(a:string) : string {
    return a;
}
let fun4 : (a: string) => string = function(a) {
    return a;
}

type callback = (a: string) => string;
let fun5 : callback = function(b) {
    return b;
}

interface ICallback {
    (a: string) : string
}
let fun6 : ICallback = function(c) {
    return c;
}

