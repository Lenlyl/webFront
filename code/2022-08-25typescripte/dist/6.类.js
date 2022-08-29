var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = /** @class */ (function () {
    function User(id, name) {
        var _this = this;
        this.showId = function () {
            console.log(_this.id);
        };
        console.log('constructor');
        this.id = id;
        this.name = name;
    }
    User.prototype.showName = function () {
        console.log(this.name);
    };
    return User;
}());
var user1 = new User(1, 'user1');
console.log(user1);
user1.showName();
var Vip = /** @class */ (function (_super) {
    __extends(Vip, _super);
    function Vip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Vip;
}(User));
var vip = new Vip(2, 'vip');
console.log(vip);
