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
const raw_expr_1 = require("../../../raw-expr");
function whereEq(query, delegate, value) {
    if (query._joins == undefined) {
        throw new Error(`Cannot use whereEq() before FROM clause`);
    }
    if (query._selects != undefined) {
        throw new Error(`Cannot use whereEq() after SELECT clause`);
    }
    if (value === null) {
        throw new Error(`Value to compare against cannot be null`);
    }
    const queryRef = column_ref_1.ColumnRefUtil.fromJoinArray(query._joins);
    const rawColumn = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef));
    column_identifier_ref_1.ColumnIdentifierRefUtil.assertHasColumnIdentifier(queryRef, rawColumn);
    if (sd.isNullable(rawColumn.assertDelegate)) {
        throw new Error(`${rawColumn.tableAlias}.${rawColumn.name} is nullable; use whereNullSafeEq() instead`);
    }
    const expr = expr_library_2.eq(rawColumn, value);
    const newJoins = join_array_1.JoinArrayUtil.replaceColumn(query._joins, new column_1.Column({
        tableAlias: rawColumn.tableAlias,
        name: rawColumn.name,
        assertDelegate: sd.chain(rawColumn.assertDelegate, raw_expr_1.RawExprUtil.assertDelegate(value)),
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
exports.whereEq = whereEq;
//# sourceMappingURL=where-eq.js.map