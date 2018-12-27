"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_ascii
function ascii(rawExpr) {
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: dataType.bigint(),
    }, new query_tree_1.FunctionCall("ASCII", [
        raw_expr_1.RawExprUtil.queryTree(rawExpr)
    ]));
    return result;
}
exports.ascii = ascii;
//# sourceMappingURL=ascii.js.map