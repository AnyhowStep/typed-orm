"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const column_ref_1 = require("../../../column-ref");
const expr_1 = require("../../../expr");
const expr_library_1 = require("../../../expr-library");
//Must be called after `FROM` as per MySQL
function andHaving(query, delegate) {
    if (query._joins == undefined) {
        throw new Error(`Cannot use HAVING before FROM clause`);
    }
    const queryRef = column_ref_1.ColumnRefUtil.fromQuery(query);
    const rawExpr = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef), query);
    const expr = expr_1.ExprUtil.fromRawExpr(rawExpr);
    column_ref_1.ColumnRefUtil.assertIsSubset(expr.usedRef, queryRef);
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _selects, _where, _grouped, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins,
        _selects,
        _where,
        _grouped,
        _having: (query._having == undefined ?
            expr :
            expr_library_1.and(query._having, expr)),
        _orders,
        _limit,
        _unions,
        _unionOrders,
        _unionLimit,
        _mapDelegate,
    });
}
exports.andHaving = andHaving;
//# sourceMappingURL=and-having.js.map