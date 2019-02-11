"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnsafeUtil;
(function (UnsafeUtil) {
    //Used to make compile-times faster but removes compile-time type safety!
    function eraseUsedRef(t) {
        return t;
    }
    UnsafeUtil.eraseUsedRef = eraseUsedRef;
})(UnsafeUtil = exports.UnsafeUtil || (exports.UnsafeUtil = {}));
//# sourceMappingURL=unsafe.js.map