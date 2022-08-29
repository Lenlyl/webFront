interface A {
    save(): void
}

interface B extends A {
    delete(): void
}

let obj4: B = {
    save() {

    },
    delete() {

    }
}

class sup {
    a : number;
    constructor(){
        this.a = 10;
    }
}

//implements 履行契约
//必须实现B中定义的方法
class son extends sup implements B {

    delete(): void {
        throw new Error("Method not implemented.");
    }
    save(): void {
        throw new Error("Method not implemented.");
    }
}