"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_tree_1 = require("../../query-tree");
function isExpr(raw) {
    return ((raw != undefined) &&
        (raw instanceof Object) &&
        ("usedRef" in raw) &&
        ("assertDelegate" in raw) &&
        ("queryTree" in raw) &&
        (raw.usedRef instanceof Object) &&
        (typeof raw.assertDelegate == "function") &&
        (query_tree_1.QueryTreeUtil.isQueryTree(raw.queryTree)));
}
exports.isExpr = isExpr;
//# sourceMappingURL=predicate.js.map