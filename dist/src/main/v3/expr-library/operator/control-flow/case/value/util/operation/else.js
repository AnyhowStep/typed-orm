"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../../../../../raw-expr");
const expr_1 = require("../../../../../../../expr");
function ElseFunction(builder, elseExpr) {
    const elseAssertDelegate = raw_expr_1.RawExprUtil.assertDelegate(elseExpr);
    if (sd.isNullable(elseAssertDelegate)) {
        throw new Error(`Nullable expression not allowed, try calling .nullableElse()`);
    }
    return new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            ...builder.usedColumns,
            elseExpr,
        ]),
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