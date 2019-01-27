"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../../column");
const query_tree_1 = require("../../../query-tree");
function isExpr(raw) {
    return ((raw != undefined) &&
        (raw instanceof Object) &&
        ("usedColumns" in raw) &&
        ("assertDelegate" in raw) &&
        ("queryTree" in raw) &&
        (column_1.ColumnUtil.Array.isColumnArray(raw.usedColumns)) &&
        (typeof raw.assertDelegate == "function") &&
        (query_tree_1.QueryTreeUtil.isQueryTree(raw.queryTree)));
}
exports.isExpr = isExpr;
//# sourceMappingURL=is-expr.js.map