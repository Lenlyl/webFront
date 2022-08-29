var str = 'lorrin';
var t = typeof str; //获取str的类型值'string'作为值
console.log(t);
// console.log(myType); 
var Person = {
    name: 'zmouse',
    age: 30
};
//keyof 取出类型中key，等同于 'name' | 'age' 
function getPersonValue(key) {
    return Person[key];
}
