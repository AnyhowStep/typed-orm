"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../../expr");
const raw_expr_1 = require("../../../../raw-expr");
const column_ref_1 = require("../../../../column-ref");
function like(rawExpr, pattern) {
    const result = new expr_1.Expr({
        usedRef: column_ref_1.ColumnRefUtil.intersect(raw_expr_1.RawExprUtil.usedRef(rawExpr), raw_expr_1.RawExprUtil.usedRef(pattern)),
        assertDelegate: sd.numberToBoolean(),
    }, [
        raw_expr_1.RawExprUtil.queryTree(rawExpr),
        "LIKE",
        raw_expr_1.RawExprUtil.queryTree(pattern),
    ]);
    result.escape = (escapeChar) => {
        escapeChar = sd.varChar(0, 1)("escapeChar", escapeChar);
        return new expr_1.Expr({
            usedRef: column_ref_1.ColumnRefUtil.intersect(raw_expr_1.RawExprUtil.usedRef(rawExpr), raw_expr_1.RawExprUtil.usedRef(pattern)),
            assertDelegate: sd.numberToBoolean(),
        }, [
            raw_expr_1.RawExprUtil.queryTree(rawExpr),
            "LIKE",
            raw_expr_1.RawExprUtil.queryTree(pattern),
            "ESCAPE",
            raw_expr_1.RawExprUtil.queryTree(escapeChar)
        ]);
    };
    return result;
}
exports.like = like;
//# sourceMappingURL=like.js.map