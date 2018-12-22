"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
function distinct(query) {
    if (query._selects == undefined) {
        throw new Error(`Cannot use DISTINCT before SELECT clause`);
    }
    const { _sqlCalcFoundRows, _joins, _parentJoins, _selects, _where, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct: true,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins,
        _selects,
        _where,
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
exports.distinct = distinct;
//# sourceMappingURL=distinct.js.map