"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const select_1 = require("./select");
function selectExpr(query, delegate) {
    if (query._selects != undefined) {
        throw new Error(`Cannot select unaliased expression after SELECT clause`);
    }
    const wrappedDelegate = c => [expr_1.ExprUtil.as(delegate(c), "value")];
    return select_1.select(query, wrappedDelegate); //TODO Not use `as any` hacks?
}
exports.selectExpr = selectExpr;
//# sourceMappingURL=select-expr.js.map