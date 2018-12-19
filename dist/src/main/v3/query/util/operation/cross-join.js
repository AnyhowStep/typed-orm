"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const predicate_1 = require("../predicate");
const join_1 = require("../../../join");
function crossJoin(query, aliasedTable) {
    if (query._joins == undefined) {
        throw new Error(`Cannot CROSS JOIN before FROM clause`);
    }
    predicate_1.assertUniqueJoinTarget(query, aliasedTable);
    const { _distinct, _sqlCalcFoundRows, _parentJoins, _selects, _where, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins: [
            ...query._joins,
            new join_1.Join({
                aliasedTable,
                columns: aliasedTable.columns,
                nullable: false,
            }, join_1.JoinType.CROSS, [], []),
        ],
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
exports.crossJoin = crossJoin;
//# sourceMappingURL=cross-join.js.map