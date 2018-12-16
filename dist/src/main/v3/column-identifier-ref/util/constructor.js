"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../column");
const expr_select_item_1 = require("../../expr-select-item");
const column_map_1 = require("../../column-map");
const column_identifier_1 = require("../../column-identifier");
function appendColumn(ref, column) {
    let map = ref[column.tableAlias];
    if (map == undefined) {
        map = {};
        ref[column.tableAlias] = map;
    }
    map[column.name] = column_identifier_1.ColumnIdentifierUtil.fromColumn(column);
    return ref;
}
function appendExprSelectItem(ref, item) {
    let map = ref[item.tableAlias];
    if (map == undefined) {
        map = {};
        ref[item.tableAlias] = map;
    }
    map[item.alias] = column_identifier_1.ColumnIdentifierUtil.fromExprSelectItem(item);
    return ref;
}
function appendColumnMap(ref, columnMap) {
    for (let columnName in columnMap) {
        appendColumn(ref, columnMap[columnName]);
    }
    return ref;
}
function fromColumnMap(columnMap) {
    const result = appendColumnMap({}, columnMap);
    return result;
}
exports.fromColumnMap = fromColumnMap;
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
exports.fromSelectItemArray = fromSelectItemArray;
function appendJoin(ref, join) {
    appendColumnMap(ref, join.columns);
    return ref;
}
function appendJoinArray(ref, arr) {
    for (let join of arr) {
        appendJoin(ref, join);
    }
    return ref;
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