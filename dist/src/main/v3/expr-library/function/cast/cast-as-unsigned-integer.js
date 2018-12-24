"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html#function_cast
function castAsUnsignedInteger(rawExpr) {
    return new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: dataType.bigint(),
    }, new query_tree_1.FunctionCall("CAST", [
        [
            raw_expr_1.RawExprUtil.queryTree(rawExpr),
            "AS",
            "UNSIGNED INTEGER"
        ]
    ]));
}
exports.castAsUnsignedInteger = castAsUnsignedInteger;
//# sourceMappingURL=cast-as-unsigned-integer.js.map