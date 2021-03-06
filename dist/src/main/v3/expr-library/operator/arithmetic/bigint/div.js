"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const raw_expr_1 = require("../../../../raw-expr");
const expr_1 = require("../../../../expr");
const column_ref_1 = require("../../../../column-ref");
const dataType = require("../../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_divide
function bigIntDiv(left, right) {
    return new expr_1.Expr({
        usedRef: column_ref_1.ColumnRefUtil.intersect(raw_expr_1.RawExprUtil.usedRef(left), raw_expr_1.RawExprUtil.usedRef(right)),
        assertDelegate: sd.orNull(dataType.double()),
    }, [
        raw_expr_1.RawExprUtil.queryTree(left),
        "/",
        raw_expr_1.RawExprUtil.queryTree(right),
    ]);
}
exports.bigIntDiv = bigIntDiv;
//# sourceMappingURL=div.js.map