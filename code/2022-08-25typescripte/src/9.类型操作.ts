let str = 'lorrin';

let t = typeof str; //获取str的类型值'string'作为值
type myType = typeof str; //捕获str的类型 string

console.log(t);
// console.log(myType); 


let Person = {
    name: 'zmouse',
    age: 30
}

type PT = typeof Person;

//keyof 取出类型中key，等同于 'name' | 'age' 
function getPersonValue(key: keyof typeof Person) {
    return Person[key]
}

type personKeys = keyof Person;
type newPerson = {
    [k in personKeys] : string
}
