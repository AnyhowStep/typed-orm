"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_collection_1 = require("../join-collection");
const select_collection_1 = require("../select-collection");
const column_references_1 = require("../column-references");
const expr_1 = require("../expr");
const join_1 = require("../join");
const column_1 = require("../column");
const aliased_expr_1 = require("../aliased-expr");
const aliased_table_1 = require("../aliased-table");
expr_1.Expr;
join_1.Join;
column_1.Column;
aliased_expr_1.AliasedExpr;
aliased_table_1.AliasedTable;
var HavingDelegateUtil;
(function (HavingDelegateUtil) {
    function execute(selectBuilder, delegate) {
        const joinColumnReferences = join_collection_1.JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins);
        const selectColumnReferences = select_collection_1.SelectCollectionUtil.toColumnReferences(selectBuilder.data.select);
        const columnReferences = column_references_1.ColumnReferencesUtil.merge(selectColumnReferences, joinColumnReferences);
        const having = delegate(column_references_1.ColumnReferencesUtil.toConvenient(columnReferences), selectBuilder);
        column_references_1.ColumnReferencesUtil.assertHasColumnReferences(columnReferences, having.usedReferences);
        return having;
    }
    HavingDelegateUtil.execute = execute;
})(HavingDelegateUtil = exports.HavingDelegateUtil || (exports.HavingDelegateUtil = {}));
//# sourceMappingURL=util.js.map