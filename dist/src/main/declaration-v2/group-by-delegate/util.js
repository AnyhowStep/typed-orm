"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_collection_1 = require("../join-collection");
const select_collection_1 = require("../select-collection");
const column_references_1 = require("../column-references");
var GroupByDelegateUtil;
(function (GroupByDelegateUtil) {
    function execute(selectBuilder, groupByDelegate) {
        const joinColumnReferences = join_collection_1.JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins);
        const selectColumnReferences = select_collection_1.SelectCollectionUtil.toColumnReferences(selectBuilder.data.selects);
        const columnReferences = column_references_1.ColumnReferencesUtil.merge(selectColumnReferences, joinColumnReferences);
        const result = groupByDelegate(column_references_1.ColumnReferencesUtil.toConvenient(columnReferences), selectBuilder);
        column_references_1.ColumnReferencesUtil.assertHasColumns(columnReferences, result);
        return result;
    }
    GroupByDelegateUtil.execute = execute;
})(GroupByDelegateUtil = exports.GroupByDelegateUtil || (exports.GroupByDelegateUtil = {}));
//# sourceMappingURL=util.js.map