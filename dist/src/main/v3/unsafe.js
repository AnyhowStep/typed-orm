"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnsafeUtil;
(function (UnsafeUtil) {
    //Used to make compile-times faster but removes compile-time type safety!
    //Makes it unsafe because `usedRef` become empty objects!
    function unsafeSelectItem(t) {
        return t;
    }
    UnsafeUtil.unsafeSelectItem = unsafeSelectItem;
})(UnsafeUtil = exports.UnsafeUtil || (exports.UnsafeUtil = {}));
//# sourceMappingURL=unsafe.js.map