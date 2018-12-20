"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../../../../../raw-expr");
const column_ref_1 = require("../../../../../../../column-ref");
const expr_1 = require("../../../../../../../expr");
function ElseFunction(builder, elseExpr) {
    const elseAssertDelegate = raw_expr_1.RawExprUtil.assertDelegate(elseExpr);
    if (sd.isNullable(elseAssertDelegate)) {
        throw new Error(`Nullable expression not allowed, try calling .nullableElse()`);
    }
    return new expr_1.Expr({
        usedRef: column_ref_1.ColumnRefUtil.intersect(builder.usedRef, raw_expr_1.RawExprUtil.usedRef(elseExpr)),
        assertDelegate: sd.or(builder.result, elseAssertDelegate),
    }, [
        ...builder.queryTree,
        "ELSE",
        raw_expr_1.RawExprUtil.queryTree(elseExpr),
        "END",
    ]);
}
exports.else = ElseFunction;
//# sourceMappingURL=else.js.map