"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const select_collection_1 = require("../select-collection");
const column_references_1 = require("../column-references");
const column_1 = require("../column");
const expr_1 = require("../expr");
var UnionOrderByDelegateUtil;
(function (UnionOrderByDelegateUtil) {
    function execute(selectBuilder, unionOrderByDelegate) {
        const columnReferences = select_collection_1.SelectCollectionUtil.toColumnReferences(selectBuilder.data.selects);
        const result = unionOrderByDelegate(column_references_1.ColumnReferencesUtil.toConvenient(columnReferences), selectBuilder);
        if (result == undefined) {
            return undefined;
        }
        for (let orderBy of result) {
            const first = (orderBy instanceof Array) ?
                orderBy[0] :
                orderBy;
            if (first instanceof column_1.Column) {
                column_references_1.ColumnReferencesUtil.assertHasColumn(columnReferences, first);
            }
            else if (first instanceof expr_1.Expr) {
                column_references_1.ColumnReferencesUtil.assertHasColumnReferences(columnReferences, first.usedReferences);
            }
            else {
                throw new Error(`Unknown order by ${typeof first}`);
            }
        }
        return result;
    }
    UnionOrderByDelegateUtil.execute = execute;
})(UnionOrderByDelegateUtil = exports.UnionOrderByDelegateUtil || (exports.UnionOrderByDelegateUtil = {}));
//# sourceMappingURL=util.js.map