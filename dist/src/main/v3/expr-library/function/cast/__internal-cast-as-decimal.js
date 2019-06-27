"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
/**
 * https://dev.mysql.com/doc/refman/5.7/en/precision-math-decimal-characteristics.html
 *
 * Casts `rawExpr` into `DECIMAL(maxDigitCount, fractionalDigitCount)`
 * where `fractionalDigitCount <= maxDigitCount`
 *
 * @param rawExpr
 * @param maxDigitCount - [1, 65]
 * @param fractionalDigitCount - [0, 30] && <= `maxDigitCount`
 */
function __internalCastAsDecimal(rawExpr, maxDigitCount, fractionalDigitCount) {
    return new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: sd.orNull(sd.string()),
    }, new query_tree_1.FunctionCall("CAST", [
        [
            raw_expr_1.RawExprUtil.queryTree(rawExpr),
            "AS",
            "DECIMAL(",
            raw_expr_1.RawExprUtil.queryTree(maxDigitCount),
            ",",
            raw_expr_1.RawExprUtil.queryTree(fractionalDigitCount),
            ")"
        ]
    ]));
}
exports.__internalCastAsDecimal = __internalCastAsDecimal;
//# sourceMappingURL=__internal-cast-as-decimal.js.map