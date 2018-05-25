"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("./aliased-table");
const column_collection_1 = require("../column-collection");
var AliasedTableUtil;
(function (AliasedTableUtil) {
    function convenientFullName(table) {
        if (table.alias == table.name) {
            return table.alias;
        }
        else {
            return `${table.name} AS ${table.alias}`;
        }
    }
    AliasedTableUtil.convenientFullName = convenientFullName;
    function assertHasColumn(table, column) {
        if (!column_collection_1.ColumnCollectionUtil.hasColumn(table.columns, column)) {
            throw new Error(`Column ${column.tableAlias}.${column.name} does not exist in table ${convenientFullName(table)}`);
        }
    }
    AliasedTableUtil.assertHasColumn = assertHasColumn;
    function assertHasColumns(table, arr) {
        for (let i of arr) {
            assertHasColumn(table, i);
        }
    }
    AliasedTableUtil.assertHasColumns = assertHasColumns;
    function isReplaceableBy(tableA, tableB) {
        return column_collection_1.ColumnCollectionUtil.isReplaceableBy(tableA.columns, tableB.columns);
    }
    AliasedTableUtil.isReplaceableBy = isReplaceableBy;
    function as(table, newAlias) {
        return new aliased_table_1.AliasedTable(newAlias, table.name, column_collection_1.ColumnCollectionUtil.withTableAlias(table.columns, newAlias));
    }
    AliasedTableUtil.as = as;
})(AliasedTableUtil = exports.AliasedTableUtil || (exports.AliasedTableUtil = {}));
//# sourceMappingURL=util.js.map