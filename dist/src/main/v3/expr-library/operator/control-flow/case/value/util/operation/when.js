"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../../../../../raw-expr");
const case_value_1 = require("../../case-value");
function when(builder, whenExpr, thenExpr) {
    const thenAssertDelegate = raw_expr_1.RawExprUtil.assertDelegate(thenExpr);
    if (sd.isNullable(thenAssertDelegate)) {
        throw new Error(`Nullable expression not allowed, try calling .nullableWhen()`);
    }
    return new case_value_1.CaseValue({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            ...builder.usedColumns,
            whenExpr,
            thenExpr,
        ]),
        value: builder.value,
        result: (builder.result == undefined ?
            thenAssertDelegate :
            sd.or(builder.result, thenAssertDelegate)),
    }, [
        ...builder.queryTree,
        "WHEN",
        raw_expr_1.RawExprUtil.queryTree(whenExpr),
        "THEN",
        raw_expr_1.RawExprUtil.queryTree(thenExpr),
    ]);
}
exports.when = when;
//# sourceMappingURL=when.js.map