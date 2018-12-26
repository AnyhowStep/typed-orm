"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const predicate_1 = require("../../predicate");
const join_1 = require("./join");
const join_2 = require("../../../../join");
const join_array_1 = require("../../../../join-array");
function rightJoin(query, aliasedTable, fromDelegate, toDelegate) {
    if (!predicate_1.canWidenColumnTypes(query)) {
        throw new Error(`Cannot use RIGHT JOIN here`);
    }
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _selects, _where, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = join_1.join(query, aliasedTable, fromDelegate, toDelegate, false, join_2.JoinType.RIGHT);
    //Pretty sure the last join is the one right join we just
    //added
    const lastJoin = _joins[_joins.length - 1];
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins: [
            ...join_array_1.JoinArrayUtil.toNullable(query._joins),
            lastJoin,
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
exports.rightJoin = rightJoin;
//# sourceMappingURL=right.js.map