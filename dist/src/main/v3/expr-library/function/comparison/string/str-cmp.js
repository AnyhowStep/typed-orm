"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const expr_1 = require("../../../../expr");
const raw_expr_1 = require("../../../../raw-expr");
const column_ref_1 = require("../../../../column-ref");
const query_tree_1 = require("../../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#function_strcmp
//C calls it strcmp()
//But "proper" camelCase says it should be strCmp()
function strCmp(left, right) {
    const result = new expr_1.Expr({
        usedRef: column_ref_1.ColumnRefUtil.intersect(raw_expr_1.RawExprUtil.usedRef(left), raw_expr_1.RawExprUtil.usedRef(right)),
        assertDelegate: sd.literal(0, 1, -1),
    }, new query_tree_1.FunctionCall("STRCMP", [
        raw_expr_1.RawExprUtil.queryTree(left),
        raw_expr_1.RawExprUtil.queryTree(right),
    ]));
    return result;
}
exports.strCmp = strCmp;
//# sourceMappingURL=str-cmp.js.map