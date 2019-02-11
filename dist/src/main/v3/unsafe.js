"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnsafeUtil;
(function (UnsafeUtil) {
    function eraseUsedRef(t) {
        const result = { ...t };
        result.usedRef = {};
        return result;
    }
    UnsafeUtil.eraseUsedRef = eraseUsedRef;
})(UnsafeUtil = exports.UnsafeUtil || (exports.UnsafeUtil = {}));
//# sourceMappingURL=unsafe.js.map