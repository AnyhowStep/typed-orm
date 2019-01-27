"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../../../../../raw-expr");
const case_value_1 = require("../../case-value");
function nullableWhen(builder, whenExpr, thenExpr) {
    return new case_value_1.CaseValue({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            ...builder.usedColumns,
            whenExpr,
            thenExpr,
        ]),
        value: builder.value,
        result: (builder.result == undefined ?
            raw_expr_1.RawExprUtil.assertDelegate(thenExpr) :
            sd.or(builder.result, raw_expr_1.RawExprUtil.assertDelegate(thenExpr))),
    }, [
        ...builder.queryTree,
        "WHEN",
        raw_expr_1.RawExprUtil.queryTree(whenExpr),
        "THEN",
        raw_expr_1.RawExprUtil.queryTree(thenExpr),
    ]);
}
exports.nullableWhen = nullableWhen;
//# sourceMappingURL=nullable-when.js.map