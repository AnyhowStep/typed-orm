"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("../column");
const type_util_1 = require("@anyhowstep/type-util");
var ColumnCollectionUtil;
(function (ColumnCollectionUtil) {
    function hasOneType(columnCollection) {
        return Object.keys(columnCollection).length == 1;
    }
    ColumnCollectionUtil.hasOneType = hasOneType;
    function hasColumn(columnCollection, other) {
        if (!columnCollection.hasOwnProperty(other.name)) {
            return false;
        }
        const column = columnCollection[other.name];
        if (!(column instanceof column_1.Column)) {
            return false;
        }
        return (column.tableAlias == other.tableAlias &&
            column.name == other.name);
    }
    ColumnCollectionUtil.hasColumn = hasColumn;
    function assertHasColumn(columnCollection, column) {
        if (!ColumnCollectionUtil.hasColumn(columnCollection, column)) {
            throw new Error(`Column ${column.tableAlias}.${column.name} does not exist in column collection`);
        }
    }
    ColumnCollectionUtil.assertHasColumn = assertHasColumn;
    function assertHasColumns(columnCollection, arr) {
        for (let i of arr) {
            assertHasColumn(columnCollection, i);
        }
    }
    ColumnCollectionUtil.assertHasColumns = assertHasColumns;
    function toNullable(columnCollection) {
        const result = {};
        for (let columnName in columnCollection) {
            if (!columnCollection.hasOwnProperty(columnName)) {
                continue;
            }
            const column = columnCollection[columnName];
            if (!(column instanceof column_1.Column)) {
                continue;
            }
            result[columnName] = column_1.ColumnUtil.toNullable(column);
        }
        return result;
    }
    ColumnCollectionUtil.toNullable = toNullable;
    function isReplaceableBy(columnsA, columnsB) {
        const aKeys = Object.keys(columnsA);
        const bKeys = Object.keys(columnsB);
        for (let a of aKeys) {
            if (bKeys.indexOf(a) < 0) {
                return false;
            }
        }
        return true;
    }
    ColumnCollectionUtil.isReplaceableBy = isReplaceableBy;
    function withTableAlias(columnCollection, newTableAlias) {
        const result = {};
        for (let columnName in columnCollection) {
            result[columnName] = column_1.ColumnUtil.withTableAlias(columnCollection[columnName], newTableAlias);
        }
        return result;
    }
    ColumnCollectionUtil.withTableAlias = withTableAlias;
    ;
    function replaceColumnType(columns, tableAlias, columnName, assertDelegate) {
        if (!columns.hasOwnProperty(columnName)) {
            //No change
            return columns;
        }
        const column = columns[columnName];
        if (column.tableAlias != tableAlias) {
            //No change
            return columns;
        }
        return type_util_1.spread(columns, {
            [columnName]: column_1.ColumnUtil.withType(column, assertDelegate)
        });
    }
    ColumnCollectionUtil.replaceColumnType = replaceColumnType;
    function andType(columnsA, columnsB) {
        const result = {};
        for (let columnName in columnsA) {
            const columnA = columnsA[columnName];
            const columnB = columnsB[columnName];
            if (columnB == undefined) {
                result[columnName] = columnA;
            }
            else {
                result[columnName] = new column_1.Column(columnA.tableAlias, columnA.name, sd.and(columnA.assertDelegate, columnB.assertDelegate), 
                //TODO Check if correct
                columnA.subTableName, columnA.isSelectReference);
            }
        }
        return result;
    }
    ColumnCollectionUtil.andType = andType;
    function merge(columnsA, columnsB) {
        return type_util_1.spread(columnsB, andType(columnsA, columnsB));
    }
    ColumnCollectionUtil.merge = merge;
    function nullableColumnNames(columnCollection) {
        const result = [];
        for (let name in columnCollection) {
            if (columnCollection.hasOwnProperty(name)) {
                try {
                    columnCollection[name].assertDelegate("test-null", null);
                    result.push(name);
                }
                catch (_err) {
                    //Do nothing
                }
            }
        }
        return result;
    }
    ColumnCollectionUtil.nullableColumnNames = nullableColumnNames;
    function assertDelegate(columnCollection, useColumnNames) {
        return sd.schema(...Object.keys(columnCollection)
            .filter((columnName) => {
            return useColumnNames.indexOf(columnName) >= 0;
        })
            .map((columnName) => {
            const column = columnCollection[columnName];
            return sd.field(column.name, column.assertDelegate);
        }));
    }
    ColumnCollectionUtil.assertDelegate = assertDelegate;
    function allNullAssertDelegate(columnCollection, useColumnNames) {
        return sd.schema(...Object.keys(columnCollection)
            .filter((columnName) => {
            return useColumnNames.indexOf(columnName) >= 0;
        })
            .map((columnName) => {
            const column = columnCollection[columnName];
            return sd.field(column.name, sd.nil());
        }));
    }
    ColumnCollectionUtil.allNullAssertDelegate = allNullAssertDelegate;
})(ColumnCollectionUtil = exports.ColumnCollectionUtil || (exports.ColumnCollectionUtil = {}));
//# sourceMappingURL=util.js.map