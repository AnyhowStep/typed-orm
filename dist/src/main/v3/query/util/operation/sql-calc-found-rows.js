"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
function sqlCalcFoundRows(query) {
    if (query._selects == undefined) {
        throw new Error(`Cannot use SQL_CALC_FOUND_ROWS before SELECT clause`);
    }
    const { _distinct, _joins, _parentJoins, _selects, _where, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows: true,
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
exports.sqlCalcFoundRows = sqlCalcFoundRows;
//# sourceMappingURL=sql-calc-found-rows.js.map