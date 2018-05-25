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
    function execute(selectBuilder, delegate) {
        const columnReferences = join_collection_1.JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins);
        const where = delegate(column_references_1.ColumnReferencesUtil.toConvenient(columnReferences), selectBuilder);
        column_references_1.ColumnReferencesUtil.assertHasColumnReferences(columnReferences, where.usedReferences);
        return where;
    }
    WhereDelegateUtil.execute = execute;
})(WhereDelegateUtil = exports.WhereDelegateUtil || (exports.WhereDelegateUtil = {}));
//# sourceMappingURL=util.js.map