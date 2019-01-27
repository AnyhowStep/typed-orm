"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_unary-minus
function neg(rawExpr) {
    return new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.usedColumns(rawExpr),
        assertDelegate: dataType.double(),
    }, [
        "-",
        raw_expr_1.RawExprUtil.queryTree(rawExpr),
    ]);
}
exports.neg = neg;
//# sourceMappingURL=neg.js.map