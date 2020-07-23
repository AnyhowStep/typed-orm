"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus
function sub(...arr) {
    const usedRef = raw_expr_1.RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree = [];
    for (let rawExpr of arr) {
        if (queryTree.length > 0) {
            queryTree.push("-");
        }
        queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
    }
    if (queryTree.length == 0) {
        //By convention, the subtraction of zero numbers is zero
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.double(),
        }, raw_expr_1.RawExprUtil.queryTree(0));
    }
    else {
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.double(),
        }, queryTree);
    }
}
exports.sub = sub;
//# sourceMappingURL=sub.js.map