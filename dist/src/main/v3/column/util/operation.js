"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("../column");
const column_ref_1 = require("../../column-ref");
const query_1 = require("./query");
const order_1 = require("../../order");
function toNullable({ tableAlias, name, assertDelegate, __subTableName, __isInSelectClause, }) {
    return new column_1.Column({
        tableAlias,
        name,
        assertDelegate: sd.nullable(assertDelegate),
    }, __subTableName, __isInSelectClause);
}
exports.toNullable = toNullable;
function withTableAlias({ name, assertDelegate, __subTableName, __isInSelectClause, }, newTableAlias) {
    const result = new column_1.Column({
        tableAlias: newTableAlias,
        name,
        assertDelegate,
    }, __subTableName, __isInSelectClause);
    return result;
}
exports.withTableAlias = withTableAlias;
function withType({ tableAlias, name, __subTableName, __isInSelectClause, }, newAssertFunc) {
    return new column_1.Column({
        tableAlias,
        name,
        assertDelegate: sd.toAssertDelegate(newAssertFunc),
    }, __subTableName, __isInSelectClause);
}
exports.withType = withType;
function as(column, alias) {
    return {
        usedRef: column_ref_1.ColumnRefUtil.fromColumn(column),
        assertDelegate: column.assertDelegate,
        tableAlias: column.tableAlias,
        alias: alias,
        unaliasedQuery: query_1.queryTree(column),
    };
}
exports.as = as;
function setIsInSelectClause(column, __isInSelectClause) {
    return new column_1.Column(column, column.__subTableName, __isInSelectClause);
}
exports.setIsInSelectClause = setIsInSelectClause;
function asc(column) {
    return [column, order_1.ASC];
}
exports.asc = asc;
function desc(column) {
    return [column, order_1.DESC];
}
exports.desc = desc;
function sort(column, sortDirection) {
    return [column, sortDirection];
}
exports.sort = sort;
//# sourceMappingURL=operation.js.map