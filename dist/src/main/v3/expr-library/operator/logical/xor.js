"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const column_ref_1 = require("../../../column-ref");
const dataType = require("../../../data-type");
function xor(left, right) {
    return new expr_1.Expr({
        usedRef: column_ref_1.ColumnRefUtil.intersect(raw_expr_1.RawExprUtil.usedRef(left), raw_expr_1.RawExprUtil.usedRef(right)),
        assertDelegate: dataType.boolean(),
    }, [
        raw_expr_1.RawExprUtil.queryTree(left),
        "XOR",
        raw_expr_1.RawExprUtil.queryTree(right),
    ]);
}
exports.xor = xor;
//# sourceMappingURL=xor.js.map