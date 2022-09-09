"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function log(type) {
    return function (target, name, descriptor) {
        console.log(type);
        console.log(target);
        var value = descriptor.value;
        descriptor.value = function (a, b) {
            var result = value(a, b);
            console.log(name, a, b, result);
            return result;
        };
    };
}
var M = /** @class */ (function () {
    function M() {
    }
    M.add = function (a, b) {
        return a + b;
    };
    __decorate([
        log('logggg')
    ], M, "add", null);
    return M;
}());
var m1 = M.add(1, 2);
console.log(m1);
function enhancer(target) {
    target.xx = 'Personmmm'; // 给类增加属性
    target.prototype.name = '金色小芝麻';
    target.prototype.age = '18';
}
var Person = /** @class */ (function () {
    function Person() {
    }
    Person = __decorate([
        enhancer // 名字随便起
    ], Person);
    return Person;
}());
var p = new Person();
console.log(Person.name); // Person
console.log(p.age, p.name); // 18
exports.default = {};
