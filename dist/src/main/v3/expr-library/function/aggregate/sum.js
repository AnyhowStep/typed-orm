"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_sum
function sum(rawExpr) {
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: sd.nullable(dataType.double()),
    }, new query_tree_1.FunctionCall("SUM", [
        raw_expr_1.RawExprUtil.queryTree(rawExpr)
    ]));
    return result;
}
exports.sum = sum;
//# sourceMappingURL=sum.js.map