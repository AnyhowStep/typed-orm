"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_map_1 = require("./column-map");
const column_identifier_map_1 = require("./column-identifier-map");
var ColumnRefUtil;
(function (ColumnRefUtil) {
    function fromJoinArray(joins) {
        return joins.reduce((memo, join) => {
            const tableAlias = join.aliasedTable.alias;
            const j = join;
            const columnMap = column_map_1.ColumnMapUtil.fromJoin(j);
            memo[tableAlias] = columnMap;
            return memo;
        }, {});
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
    function fromColumn(column) {
        return {
            [column.tableAlias]: column_map_1.ColumnMapUtil.fromColumn(column)
        };
    }
    ColumnRefUtil.fromColumn = fromColumn;
    function fromQueryJoins(query) {
        if (query.joins == undefined) {
            return {};
        }
        else {
            return fromJoinArray(query.joins);
        }
    }
    function fromQueryParentJoins(query) {
        if (query.parentJoins == undefined) {
            return {};
        }
        else {
            return fromJoinArray(query.parentJoins);
        }
    }
    function fromQuery(query) {
        const joinRef = fromQueryJoins(query);
        const parentJoinRef = fromQueryParentJoins(query);
        return Object.assign({}, joinRef, parentJoinRef);
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
        if (!columnRef.hasOwnProperty(columnIdentifier.tableAlias)) {
            return false;
        }
        const columnMap = columnRef[columnIdentifier.tableAlias];
        return column_map_1.ColumnMapUtil.hasColumnIdentifier(columnMap, columnIdentifier);
    }
    ColumnRefUtil.hasColumnIdentifier = hasColumnIdentifier;
    function assertHasColumnIdentifier(columnRef, columnIdentifier) {
        if (!hasColumnIdentifier(columnRef, columnIdentifier)) {
            throw new Error(`Column ${columnIdentifier.tableAlias}.${columnIdentifier.name} does not exist in column ref`);
        }
    }
    ColumnRefUtil.assertHasColumnIdentifier = assertHasColumnIdentifier;
    function assertHasColumnIdentifiers(columnRef, columnIdentifiers) {
        for (let columnIdentifier of columnIdentifiers) {
            assertHasColumnIdentifier(columnRef, columnIdentifier);
        }
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
})(ColumnRefUtil = exports.ColumnRefUtil || (exports.ColumnRefUtil = {}));
//# sourceMappingURL=column-ref.js.map