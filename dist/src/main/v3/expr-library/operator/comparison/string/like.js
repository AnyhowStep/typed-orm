"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../../expr");
const raw_expr_1 = require("../../../../raw-expr");
const dataType = require("../../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like
function like(rawExpr, pattern) {
    const result = new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            rawExpr,
            pattern,
        ]),
        assertDelegate: dataType.boolean(),
    }, [
        raw_expr_1.RawExprUtil.queryTree(rawExpr),
        "LIKE",
        raw_expr_1.RawExprUtil.queryTree(pattern),
    ]);
    result.escape = (escapeChar) => {
        escapeChar = sd.varChar(0, 1)("escapeChar", escapeChar);
        return new expr_1.Expr({
            usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
                rawExpr,
                pattern,
            ]),
            assertDelegate: dataType.boolean(),
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