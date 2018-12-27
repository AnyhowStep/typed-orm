"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_field
function field(needle, arg0, ...args) {
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple(needle, arg0, ...args),
        assertDelegate: dataType.bigint(),
    }, new query_tree_1.FunctionCall("FIELD", [
        raw_expr_1.RawExprUtil.queryTree(needle),
        raw_expr_1.RawExprUtil.queryTree(arg0),
        ...args.map(raw_expr_1.RawExprUtil.queryTree)
    ]));
    return result;
}
exports.field = field;
//# sourceMappingURL=field.js.map