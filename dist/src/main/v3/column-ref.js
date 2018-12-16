"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_map_1 = require("./column-map");
const column_1 = require("./column");
const column_identifier_map_1 = require("./column-identifier-map");
const column_identifier_ref_1 = require("./column-identifier-ref");
const expr_select_item_1 = require("./expr-select-item");
var ColumnRefUtil;
(function (ColumnRefUtil) {
    function appendJoin(ref, join) {
        appendColumnMap(ref, column_map_1.ColumnMapUtil.fromJoin(join));
        return ref;
    }
    function appendJoinArray(ref, arr) {
        for (let join of arr) {
            appendJoin(ref, join);
        }
        return ref;
    }
    function fromJoinArray(joins) {
        return appendJoinArray({}, joins);
    }
    ColumnRefUtil.fromJoinArray = fromJoinArray;
    function hasOneTable(columnRef) {
        return (Object.keys(columnRef).length == 1);
    }
    ColumnRefUtil.hasOneTable = hasOneTable;
    function toConvenient(columnRef) {
        const keys = Object.keys(columnRef);
        if (keys.length == 1) {
            const result = columnRef[keys[0]];
            return result;
        }
        else {
            return columnRef;
        }
    }
    ColumnRefUtil.toConvenient = toConvenient;
    function appendColumn(ref, column) {
        let map = ref[column.tableAlias];
        if (map == undefined) {
            map = {};
            ref[column.tableAlias] = map;
        }
        map[column.name] = column;
        return ref;
    }
    function fromColumn(column) {
        return appendColumn({}, column);
    }
    ColumnRefUtil.fromColumn = fromColumn;
    function appendExprSelectItem(ref, item) {
        let map = ref[item.tableAlias];
        if (map == undefined) {
            map = {};
            ref[item.tableAlias] = map;
        }
        map[item.alias] = column_1.ColumnUtil.fromExprSelectItem(item);
        return ref;
    }
    function appendColumnMap(ref, columnMap) {
        for (let columnName in columnMap) {
            appendColumn(ref, columnMap[columnName]);
        }
        return ref;
    }
    function appendQuerySelfJoins(ref, query) {
        if (query._joins == undefined) {
            return ref;
        }
        else {
            return appendJoinArray(ref, query._joins);
        }
    }
    function appendQueryParentJoins(ref, query) {
        if (query._parentJoins == undefined) {
            return ref;
        }
        else {
            return appendJoinArray(ref, query._parentJoins);
        }
    }
    function appendQueryJoins(ref, query) {
        appendQuerySelfJoins(ref, query);
        appendQueryParentJoins(ref, query);
    }
    function fromQueryJoins(query) {
        const result = {};
        appendQueryJoins(result, query);
        return result;
    }
    ColumnRefUtil.fromQueryJoins = fromQueryJoins;
    function appendSelectItem(ref, item) {
        if (column_1.ColumnUtil.isColumn(item)) {
            appendColumn(ref, item);
        }
        else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(item)) {
            appendExprSelectItem(ref, item);
        }
        else if (column_map_1.ColumnMapUtil.isColumnMap(item)) {
            appendColumnMap(ref, item);
        }
        else {
            throw new Error(`Unknown select item`);
        }
        return ref;
    }
    function appendSelectItemArray(ref, arr) {
        for (let item of arr) {
            appendSelectItem(ref, item);
        }
        return ref;
    }
    function fromSelectItemArray(arr) {
        const result = {};
        appendSelectItemArray(result, arr);
        return result;
    }
    ColumnRefUtil.fromSelectItemArray = fromSelectItemArray;
    function fromQuery(query) {
        const result = {};
        appendQueryJoins(result, query);
        if (query._selects != undefined) {
            appendSelectItemArray(result, query._selects);
        }
        return result;
    }
    ColumnRefUtil.fromQuery = fromQuery;
    function assertIsSubset(a, b) {
        for (let tableAliasA in a) {
            const columnMapA = a[tableAliasA];
            const columnMapB = b[tableAliasA];
            if (columnMapB == undefined) {
                throw new Error(`Table ${tableAliasA} is not allowed`);
            }
            column_identifier_map_1.ColumnIdentifierMapUtil.assertIsSubset(columnMapA, columnMapB);
        }
    }
    ColumnRefUtil.assertIsSubset = assertIsSubset;
    function hasColumnIdentifier(columnRef, columnIdentifier) {
        return column_identifier_ref_1.ColumnIdentifierRefUtil.hasColumnIdentifier(columnRef, columnIdentifier);
    }
    ColumnRefUtil.hasColumnIdentifier = hasColumnIdentifier;
    function assertHasColumnIdentifier(columnRef, columnIdentifier) {
        column_identifier_ref_1.ColumnIdentifierRefUtil.assertHasColumnIdentifier(columnRef, columnIdentifier);
    }
    ColumnRefUtil.assertHasColumnIdentifier = assertHasColumnIdentifier;
    function assertHasColumnIdentifiers(columnRef, columnIdentifiers) {
        column_identifier_ref_1.ColumnIdentifierRefUtil.assertHasColumnIdentifiers(columnRef, columnIdentifiers);
    }
    ColumnRefUtil.assertHasColumnIdentifiers = assertHasColumnIdentifiers;
    function fromColumnArray(columns) {
        const result = {};
        for (let column of columns) {
            let columnMap = result[column.tableAlias];
            if (columnMap == undefined) {
                columnMap = {};
                result[column.tableAlias] = columnMap;
            }
            columnMap[column.name] = column;
        }
        return result;
    }
    ColumnRefUtil.fromColumnArray = fromColumnArray;
    function intersect(columnRefA, columnRefB) {
        const result = {};
        for (let tableAlias in columnRefA) {
            if (columnRefB.hasOwnProperty(tableAlias)) {
                result[tableAlias] = column_map_1.ColumnMapUtil.intersect(columnRefA[tableAlias], columnRefB[tableAlias]);
            }
            else {
                result[tableAlias] = columnRefA[tableAlias];
            }
        }
        for (let tableAlias in columnRefB) {
            if (!columnRefA.hasOwnProperty(tableAlias)) {
                result[tableAlias] = columnRefB[tableAlias];
            }
        }
        return result;
    }
    ColumnRefUtil.intersect = intersect;
    function intersectTuple(...arr) {
        let result = {};
        for (let columnRef of arr) {
            result = intersect(result, columnRef);
        }
        return result;
    }
    ColumnRefUtil.intersectTuple = intersectTuple;
})(ColumnRefUtil = exports.ColumnRefUtil || (exports.ColumnRefUtil = {}));
//# sourceMappingURL=column-ref.js.map