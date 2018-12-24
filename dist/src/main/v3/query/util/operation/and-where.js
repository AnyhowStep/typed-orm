"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const column_ref_1 = require("../../../column-ref");
const expr_1 = require("../../../expr");
const expr_library_1 = require("../../../expr-library");
//Must be called after `FROM` as per MySQL
function where(query, delegate) {
    if (query._joins == undefined) {
        throw new Error(`Cannot use WHERE before FROM clause`);
    }
    const queryRef = column_ref_1.ColumnRefUtil.fromQueryJoins(query);
    const rawExpr = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef), query);
    const expr = expr_1.ExprUtil.fromRawExpr(rawExpr);
    column_ref_1.ColumnRefUtil.assertIsSubset(expr.usedRef, queryRef);
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _selects, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
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
exports.where = where;
//# sourceMappingURL=and-where.js.map