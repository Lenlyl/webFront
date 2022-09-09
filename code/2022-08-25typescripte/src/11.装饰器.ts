function log(type: string) {
    return function (target: Function, name: string, descriptor: PropertyDescriptor) {
        console.log(type);
        console.log(target);
        
        let value = descriptor.value;
        descriptor.value = function (a:number, b:number) {
            let result = value(a, b);
            console.log(name, a, b, result);
            return result;
        }
    }
}

class M {

    @log('logggg')
    static add(a: number, b: number) {
        return a+b;
    }
}

let m1 = M.add(1, 2)
console.log(m1);



interface Person {
    name: string
    age: string
  }
  function enhancer(target: any) {
    target.xx = 'Personmmm' ; // 给类增加属性
    target.prototype.name = '金色小芝麻'
    target.prototype.age = '18'
  }
  @enhancer // 名字随便起
  class Person {
    constructor() { }
  }
  let p = new Person()
  console.log(Person.name); // Person
  console.log(p.age, p.name) // 18

  export default {}