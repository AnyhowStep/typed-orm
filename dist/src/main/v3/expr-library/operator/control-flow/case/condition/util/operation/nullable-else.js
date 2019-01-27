"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../../../../../raw-expr");
const expr_1 = require("../../../../../../../expr");
function NullableElseFunction(builder, elseExpr) {
    return new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            ...builder.usedColumns,
            elseExpr,
        ]),
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