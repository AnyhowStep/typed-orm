"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_collection_1 = require("../column-collection");
var ColumnReferencesUtil;
(function (ColumnReferencesUtil) {
    function toNullable(columnReferences) {
        const result = {};
        for (let tableAlias in columnReferences) {
            if (!columnReferences.hasOwnProperty(tableAlias)) {
                continue;
            }
            const columnCollection = columnReferences[tableAlias];
            if (!(columnCollection instanceof Object)) {
                continue;
            }
            result[tableAlias] = column_collection_1.ColumnCollectionUtil.toNullable(columnCollection);
        }
        return result;
    }
    ColumnReferencesUtil.toNullable = toNullable;
    function merge(refA, refB) {
        const result = {};
        for (let tableAlias in refA) {
            if (refB.hasOwnProperty(tableAlias)) {
                result[tableAlias] = column_collection_1.ColumnCollectionUtil.merge(refA[tableAlias], refB[tableAlias]);
            }
            else {
                result[tableAlias] = refA[tableAlias];
            }
        }
        for (let tableAlias in refB) {
            if (!refA.hasOwnProperty(tableAlias)) {
                result[tableAlias] = refB[tableAlias];
            }
        }
        return result;
    }
    ColumnReferencesUtil.merge = merge;
    function toConvenient(ref) {
        const keys = Object.keys(ref);
        if (keys.length == 1) {
            return ref[keys[0]];
        }
        else {
            return ref;
        }
    }
    ColumnReferencesUtil.toConvenient = toConvenient;
    function hasColumn(ref, column) {
        if (!ref.hasOwnProperty(column.tableAlias)) {
            return false;
        }
        const columnCollection = ref[column.tableAlias];
        return column_collection_1.ColumnCollectionUtil.hasColumn(columnCollection, column);
    }
    ColumnReferencesUtil.hasColumn = hasColumn;
    function assertHasColumn(ref, column) {
        if (!hasColumn(ref, column)) {
            throw new Error(`Column ${column.tableAlias}.${column.name} does not exist in column references`);
        }
    }
    ColumnReferencesUtil.assertHasColumn = assertHasColumn;
    function assertHasColumns(ref, arr) {
        for (let i of arr) {
            assertHasColumn(ref, i);
        }
    }
    ColumnReferencesUtil.assertHasColumns = assertHasColumns;
    function assertHasColumnReferences(ref, targetReferences) {
        for (let tableAlias in targetReferences) {
            if (!targetReferences.hasOwnProperty(tableAlias)) {
                continue;
            }
            const targetColumns = targetReferences[tableAlias];
            if (!(targetColumns instanceof Object)) {
                continue;
            }
            for (let columnName in targetColumns) {
                if (!targetColumns.hasOwnProperty(columnName)) {
                    continue;
                }
                assertHasColumn(ref, targetColumns[columnName]);
            }
        }
    }
    ColumnReferencesUtil.assertHasColumnReferences = assertHasColumnReferences;
})(ColumnReferencesUtil = exports.ColumnReferencesUtil || (exports.ColumnReferencesUtil = {}));
//# sourceMappingURL=util.js.map