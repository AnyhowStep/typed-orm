"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const join_delegate_1 = require("./join-delegate");
const join_1 = require("../../../join");
function innerJoin(query, aliasedTable, fromDelegate, toDelegate) {
    const { from, to } = join_delegate_1.invokeJoinDelegate(query, aliasedTable, fromDelegate, toDelegate);
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
            }, join_1.JoinType.INNER, from, to),
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
exports.innerJoin = innerJoin;
//# sourceMappingURL=inner-join.js.map