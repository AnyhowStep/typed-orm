"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_collection_1 = require("../join-collection");
const column_references_1 = require("../column-references");
var TypeNarrowDelegateUtil;
(function (TypeNarrowDelegateUtil) {
    function toColumnReferences(selectBuilder) {
        const joinColumnReferences = selectBuilder.data.hasFrom ?
            join_collection_1.JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins) :
            {};
        const parentJoinColumnReferences = selectBuilder.data.hasParentJoins ?
            join_collection_1.JoinCollectionUtil.toColumnReferences(selectBuilder.data.parentJoins) :
            {};
        return Object.assign({}, parentJoinColumnReferences, joinColumnReferences);
    }
    TypeNarrowDelegateUtil.toColumnReferences = toColumnReferences;
    function getColumn(selectBuilder, typeNarrowDelegate) {
        const columnReferences = toColumnReferences(selectBuilder);
        const column = typeNarrowDelegate(column_references_1.ColumnReferencesUtil.toConvenient(columnReferences));
        column_references_1.ColumnReferencesUtil.assertHasColumn(columnReferences, column);
        return column;
    }
    TypeNarrowDelegateUtil.getColumn = getColumn;
})(TypeNarrowDelegateUtil = exports.TypeNarrowDelegateUtil || (exports.TypeNarrowDelegateUtil = {}));
//# sourceMappingURL=util.js.map