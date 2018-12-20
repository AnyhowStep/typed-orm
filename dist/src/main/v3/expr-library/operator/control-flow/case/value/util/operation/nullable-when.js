"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../../../../../raw-expr");
const column_ref_1 = require("../../../../../../../column-ref");
const case_1 = require("../../case");
function nullableWhen(builder, whenExpr, thenExpr) {
    return new case_1.Case({
        usedRef: column_ref_1.ColumnRefUtil.intersect(builder.usedRef, column_ref_1.ColumnRefUtil.intersect(raw_expr_1.RawExprUtil.usedRef(whenExpr), raw_expr_1.RawExprUtil.usedRef(thenExpr))),
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