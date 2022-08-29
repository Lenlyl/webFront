var obj = {
    a: 1,
    // fn(b: number) {
    //     console.log(this.b); //默认是any
    // }
    fn: function (b) {
        console.log(this.a);
    }
};
obj.fn(2);
//箭头函数this
var fn = function (a) {
};
var obj2 = {
    a: 1,
    fn: function (x) {
        var _this = this;
        return function () {
            _this; //不能在()内指定this，只能在外层函数指定，该this指向外层函数的this,此处是window
        };
    }
};
