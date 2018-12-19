"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const join_1 = require("../../../join");
const predicate_1 = require("../predicate");
//Must be done before any JOINs, as per MySQL
function from(query, aliasedTable) {
    if (query._joins != undefined) {
        throw new Error(`FROM clause not allowed more than once`);
    }
    predicate_1.assertUniqueJoinTarget(query, aliasedTable);
    const { _distinct, _sqlCalcFoundRows, _parentJoins, _selects, _where, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins: [
            new join_1.Join({
                aliasedTable,
                columns: aliasedTable.columns,
                nullable: false,
            }, join_1.JoinType.FROM, [], []),
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
exports.from = from;
//# sourceMappingURL=from.js.map