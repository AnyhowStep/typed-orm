"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
function map(query, delegate) {
    if (query._selects == undefined) {
        throw new Error(`Cannot use map() before SELECT clause`);
    }
    //TODO-UNHACK Not use all this hackery
    let newMapDelegate = undefined;
    if (query._mapDelegate == undefined) {
        newMapDelegate = (async (row, originalRow) => {
            return delegate(row, originalRow);
        });
    }
    else {
        const prvDelegate = query._mapDelegate;
        newMapDelegate = (async (row, originalRow) => {
            const prvResult = await prvDelegate(row, originalRow);
            return delegate(prvResult, originalRow);
        });
    }
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _selects, _where, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, } = query;
    return new query_1.Query({
        _distinct,
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
        _mapDelegate: newMapDelegate,
    });
}
exports.map = map;
//# sourceMappingURL=map.js.map