"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../../../../raw-expr");
const column_ref_1 = require("../../../../../../column-ref");
const expr_1 = require("../../../../../../expr");
function NullableElseFunction(builder, elseExpr) {
    return new expr_1.Expr({
        usedRef: column_ref_1.ColumnRefUtil.intersect(builder.usedRef, raw_expr_1.RawExprUtil.usedRef(elseExpr)),
        assertDelegate: sd.or(builder.result, raw_expr_1.RawExprUtil.assertDelegate(elseExpr)),
    }, [
        ...builder.queryTree,
        "ELSE",
        raw_expr_1.RawExprUtil.queryTree(elseExpr),
        "END",
    ]);
}
exports.nullableElse = NullableElseFunction;
//# sourceMappingURL=nullable-else.js.map