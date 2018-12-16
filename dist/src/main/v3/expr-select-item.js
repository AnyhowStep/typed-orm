"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_tree_1 = require("./query-tree");
const sqlstring_1 = require("sqlstring");
const constants_1 = require("./constants");
var ExprSelectItemUtil;
(function (ExprSelectItemUtil) {
    function isExprSelectItem(raw) {
        return (raw != undefined &&
            (raw instanceof Object) &&
            ("usedRef" in raw) &&
            ("assertDelegate" in raw) &&
            ("tableAlias" in raw) &&
            ("alias" in raw) &&
            ("unaliasedQuery" in raw) &&
            (raw.usedRef instanceof Object) &&
            (typeof raw.assertDelegate == "function") &&
            (typeof raw.tableAlias == "string") &&
            (typeof raw.alias == "string") &&
            (query_tree_1.QueryTreeUtil.isQueryTree(raw.unaliasedQuery)));
    }
    ExprSelectItemUtil.isExprSelectItem = isExprSelectItem;
    function queryTree(exprSelectItem) {
        return [
            query_tree_1.Parentheses.Create(exprSelectItem.unaliasedQuery),
            "AS",
            sqlstring_1.escapeId(`${exprSelectItem.tableAlias}${constants_1.SEPARATOR}${exprSelectItem.alias}`)
        ];
    }
    ExprSelectItemUtil.queryTree = queryTree;
})(ExprSelectItemUtil = exports.ExprSelectItemUtil || (exports.ExprSelectItemUtil = {}));
//# sourceMappingURL=expr-select-item.js.map