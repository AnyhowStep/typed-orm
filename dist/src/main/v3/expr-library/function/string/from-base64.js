"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_from-base64
function fromBase64(strExpr) {
    const result = new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.usedColumns(strExpr),
        assertDelegate: sd.string(),
    }, new query_tree_1.FunctionCall("FROM_BASE64", [
        raw_expr_1.RawExprUtil.queryTree(strExpr)
    ]));
    return result;
}
exports.fromBase64 = fromBase64;
//# sourceMappingURL=from-base64.js.map