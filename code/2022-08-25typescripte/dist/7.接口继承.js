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
var obj4 = {
    save: function () {
    },
    delete: function () {
    }
};
var sup = /** @class */ (function () {
    function sup() {
        this.a = 10;
    }
    return sup;
}());
//implements 履行契约
//必须实现B中定义的方法
var son = /** @class */ (function (_super) {
    __extends(son, _super);
    function son() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    son.prototype.delete = function () {
        throw new Error("Method not implemented.");
    };
    son.prototype.save = function () {
        throw new Error("Method not implemented.");
    };
    return son;
}(sup));
