"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const join_1 = require("../../../join");
const predicate_1 = require("../predicate");
/*
    Although not necessary, prevent duplicates in this ArrT?
*/
function requireParentJoins(query, nullable, ...arr) {
    for (let aliasedTable of arr) {
        predicate_1.assertValidJoinTarget(query, aliasedTable);
    }
    const parentJoins = arr.map(aliasedTable => new join_1.Join({
        aliasedTable,
        columns: aliasedTable.columns,
        nullable,
    }, 
    //It doesn't matter what type of Join this is.
    //It should never affect output.
    join_1.JoinType.INNER, [], []));
    const { _distinct, _sqlCalcFoundRows, _joins, _selects, _where, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins: ((query._parentJoins == undefined) ?
            parentJoins :
            [...query._parentJoins, ...parentJoins]),
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
exports.requireParentJoins = requireParentJoins;
//# sourceMappingURL=require-parent-joins.js.map