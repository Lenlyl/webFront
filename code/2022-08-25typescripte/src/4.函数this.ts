interface T {
    a: number,
    fn: (b: number) => void
}
let obj = {
    a: 1,
    // fn(b: number) {
    //     console.log(this.b); //默认是any
    // }
    fn(this: T, b: number) { //第一个参数this类型标准，不作为实参
        console.log(this.a);
    }
}
obj.fn(2);

//箭头函数this
let fn = (a: string) => {

}

let obj2: T = {
    a: 1,
    fn(this: Window, x: number) {
        return () => {
            this //不能在()内指定this，只能在外层函数指定，该this指向外层函数的this,此处是window
        }
    }
}

