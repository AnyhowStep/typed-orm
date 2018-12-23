"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_round
function round(rawExpr) {
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: sd.naturalNumber(),
    }, new query_tree_1.FunctionCall("ROUND", [
        raw_expr_1.RawExprUtil.queryTree(rawExpr)
    ]));
    return result;
}
exports.round = round;
//# sourceMappingURL=round.js.map