"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_collection_1 = require("../join-collection");
const column_references_1 = require("../column-references");
const expr_1 = require("../expr");
const join_1 = require("../join");
const column_1 = require("../column");
const aliased_table_1 = require("../aliased-table");
expr_1.Expr;
join_1.Join;
column_1.Column;
aliased_table_1.AliasedTable;
var WhereDelegateUtil;
(function (WhereDelegateUtil) {
    function toColumnReferences(selectBuilder) {
        const joinColumnReferences = selectBuilder.data.hasFrom ?
            join_collection_1.JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins) :
            {};
        const parentJoinColumnReferences = selectBuilder.data.hasParentJoins ?
            join_collection_1.JoinCollectionUtil.toColumnReferences(selectBuilder.data.parentJoins) :
            {};
        return Object.assign({}, parentJoinColumnReferences, joinColumnReferences);
    }
    WhereDelegateUtil.toColumnReferences = toColumnReferences;
    function execute(selectBuilder, delegate) {
        const columnReferences = toColumnReferences(selectBuilder);
        const where = delegate(column_references_1.ColumnReferencesUtil.toConvenient(columnReferences), selectBuilder);
        console.log(columnReferences);
        column_references_1.ColumnReferencesUtil.assertHasColumnReferences(columnReferences, where.usedReferences);
        return where;
    }
    WhereDelegateUtil.execute = execute;
})(WhereDelegateUtil = exports.WhereDelegateUtil || (exports.WhereDelegateUtil = {}));
//# sourceMappingURL=util.js.map