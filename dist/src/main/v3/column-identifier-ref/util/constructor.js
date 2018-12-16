"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../column");
const expr_select_item_1 = require("../../expr-select-item");
const column_map_1 = require("../../column-map");
const column_identifier_1 = require("../../column-identifier");
function appendColumn(columnIdentifierRef, column) {
    let columnIdentifierMap = columnIdentifierRef[column.tableAlias];
    if (columnIdentifierMap == undefined) {
        columnIdentifierMap = {};
        columnIdentifierRef[column.tableAlias] = columnIdentifierMap;
    }
    columnIdentifierMap[column.name] = column_identifier_1.ColumnIdentifierUtil.fromColumn(column);
    return columnIdentifierRef;
}
function appendExprSelectItem(columnIdentifierRef, item) {
    let columnIdentifierMap = columnIdentifierRef[item.tableAlias];
    if (columnIdentifierMap == undefined) {
        columnIdentifierMap = {};
        columnIdentifierRef[item.tableAlias] = columnIdentifierMap;
    }
    columnIdentifierMap[item.alias] = column_identifier_1.ColumnIdentifierUtil.fromExprSelectItem(item);
    return columnIdentifierRef;
}
function appendColumnMap(columnIdentifierRef, columnMap) {
    for (let columnName in columnMap) {
        appendColumn(columnIdentifierRef, columnMap[columnName]);
    }
    return columnIdentifierRef;
}
function fromColumnMap(columnMap) {
    const result = appendColumnMap({}, columnMap);
    return result;
}
exports.fromColumnMap = fromColumnMap;
function appendSelectItem(columnIdentifierRef, item) {
    if (column_1.ColumnUtil.isColumn(item)) {
        appendColumn(columnIdentifierRef, item);
    }
    else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(item)) {
        appendExprSelectItem(columnIdentifierRef, item);
    }
    else if (column_map_1.ColumnMapUtil.isColumnMap(item)) {
        appendColumnMap(columnIdentifierRef, item);
    }
    else {
        throw new Error(`Unknown select item`);
    }
    return columnIdentifierRef;
}
function appendSelectItemArray(columnIdentifierRef, arr) {
    for (let item of arr) {
        appendSelectItem(columnIdentifierRef, item);
    }
    return columnIdentifierRef;
}
function fromSelectItemArray(arr) {
    const result = {};
    appendSelectItemArray(result, arr);
    return result;
}
exports.fromSelectItemArray = fromSelectItemArray;
function appendJoin(columnIdentifierRef, join) {
    appendColumnMap(columnIdentifierRef, join.columns);
    return columnIdentifierRef;
}
function appendJoinArray(columnIdentifierRef, arr) {
    for (let join of arr) {
        appendJoin(columnIdentifierRef, join);
    }
    return columnIdentifierRef;
}
function fromJoinArray(arr) {
    const result = {};
    appendJoinArray(result, arr);
    return result;
}
exports.fromJoinArray = fromJoinArray;
function fromQuery(query) {
    const result = {};
    if (query._joins != undefined) {
        appendJoinArray(result, query._joins);
    }
    if (query._parentJoins != undefined) {
        appendJoinArray(result, query._parentJoins);
    }
    if (query._selects != undefined) {
        appendSelectItemArray(result, query._selects);
    }
    return result;
}
exports.fromQuery = fromQuery;
//# sourceMappingURL=constructor.js.map