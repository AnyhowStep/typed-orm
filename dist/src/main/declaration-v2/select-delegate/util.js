"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_collection_1 = require("../join-collection");
const column_references_1 = require("../column-references");
var SelectDelegateUtil;
(function (SelectDelegateUtil) {
    function toColumnReferences(selectBuilder) {
        const joinColumnReferences = selectBuilder.data.hasFrom ?
            join_collection_1.JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins) :
            {};
        const parentJoinColumnReferences = selectBuilder.data.hasParentJoins ?
            join_collection_1.JoinCollectionUtil.toColumnReferences(selectBuilder.data.parentJoins) :
            {};
        return Object.assign({}, parentJoinColumnReferences, joinColumnReferences);
    }
    SelectDelegateUtil.toColumnReferences = toColumnReferences;
    function execute(selectBuilder, selectDelegate) {
        const columnReferences = toColumnReferences(selectBuilder);
        const result = selectDelegate(column_references_1.ColumnReferencesUtil.toConvenient(columnReferences), selectBuilder);
        //TODO Write assertions, expressions must use column references only
        //columns must exist in column references
        //Column collections must exist in column references
        return result;
    }
    SelectDelegateUtil.execute = execute;
})(SelectDelegateUtil = exports.SelectDelegateUtil || (exports.SelectDelegateUtil = {}));
//# sourceMappingURL=util.js.map