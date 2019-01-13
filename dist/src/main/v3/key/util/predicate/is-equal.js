"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_sub_key_1 = require("./is-sub-key");
function isEqual(a, b) {
    return (is_sub_key_1.isSubKey(a, b) &&
        is_sub_key_1.isSubKey(b, a));
}
exports.isEqual = isEqual;
//# sourceMappingURL=is-equal.js.map