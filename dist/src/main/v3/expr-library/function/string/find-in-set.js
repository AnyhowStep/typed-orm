"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_find-in-set
function findInSet(needle, set) {
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple(needle, set),
        assertDelegate: dataType.bigint(),
    }, new query_tree_1.FunctionCall("FIND_IN_SET", [
        raw_expr_1.RawExprUtil.queryTree(needle),
        raw_expr_1.RawExprUtil.queryTree(set),
    ]));
    return result;
}
exports.findInSet = findInSet;
//# sourceMappingURL=find-in-set.js.map