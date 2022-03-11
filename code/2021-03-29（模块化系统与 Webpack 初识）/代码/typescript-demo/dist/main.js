(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./a"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var a_1 = require("./a");
    console.log(a_1.v);
    a_1.hello();
});
