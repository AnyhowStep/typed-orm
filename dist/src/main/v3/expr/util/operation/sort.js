"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../../order");
function asc(expr) {
    return [expr, order_1.ASC];
}
exports.asc = asc;
function desc(expr) {
    return [expr, order_1.DESC];
}
exports.desc = desc;
function sort(expr, sortDirection) {
    return [expr, sortDirection];
}
exports.sort = sort;
//# sourceMappingURL=sort.js.map