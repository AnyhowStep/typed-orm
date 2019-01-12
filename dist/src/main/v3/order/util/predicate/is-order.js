"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_sort_direction_1 = require("./is-sort-direction");
const is_sort_expr_1 = require("./is-sort-expr");
function isOrder(raw) {
    if (!(raw instanceof Array)) {
        return false;
    }
    if (raw.length != 2) {
        return false;
    }
    if (!is_sort_direction_1.isSortDirection(raw[1])) {
        return false;
    }
    if (!is_sort_expr_1.isSortExpr(raw[0])) {
        return false;
    }
    return true;
}
exports.isOrder = isOrder;
//# sourceMappingURL=is-order.js.map