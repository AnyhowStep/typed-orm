"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function isOrderArray(raw) {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!predicate_1.isOrder(item)) {
            return false;
        }
    }
    return true;
}
exports.isOrderArray = isOrderArray;
//# sourceMappingURL=is-order-array.js.map