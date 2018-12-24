"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const query_1 = require("../../query");
const column_ref_1 = require("../../../column-ref");
const column_1 = require("../../../column");
const expr_library_1 = require("../../../expr-library");
const join_array_1 = require("../../../join-array");
const column_identifier_ref_1 = require("../../../column-identifier-ref");
const expr_library_2 = require("../../../expr-library");
function andWhereIsNotNull(query, delegate) {
    if (query._joins == undefined) {
        throw new Error(`Cannot use andWhereIsNotNull() before FROM clause`);
    }
    if (query._selects != undefined) {
        throw new Error(`Cannot use andWhereIsNotNull() after SELECT clause`);
    }
    const queryRef = column_ref_1.ColumnRefUtil.fromJoinArray(query._joins);
    const rawColumn = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef));
    column_identifier_ref_1.ColumnIdentifierRefUtil.assertHasColumnIdentifier(queryRef, rawColumn);
    if (!sd.isNullable(rawColumn.assertDelegate)) {
        throw new Error(`${rawColumn.tableAlias}.${rawColumn.name} is not nullable`);
    }
    const expr = expr_library_2.isNotNull(rawColumn);
    const newJoins = join_array_1.JoinArrayUtil.replaceColumn(query._joins, new column_1.Column({
        tableAlias: rawColumn.tableAlias,
        name: rawColumn.name,
        assertDelegate: sd.notNullable(rawColumn.assertDelegate),
    }, rawColumn.__subTableName, rawColumn.__isInSelectClause));
    const { _distinct, _sqlCalcFoundRows, _parentJoins, _selects, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins: newJoins,
        _parentJoins,
        _selects,
        _where: (query._where == undefined ?
            expr :
            expr_library_1.and(query._where, expr)),
        _grouped,
        _having,
        _orders,
        _limit,
        _unions,
        _unionOrders,
        _unionLimit,
        _mapDelegate,
    });
}
exports.andWhereIsNotNull = andWhereIsNotNull;
//# sourceMappingURL=and-where-is-not-null.js.map