"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const join_delegate_1 = require("./join-delegate");
const join_1 = require("../../../join");
function useJoin(query, joinDecl) {
    const { from, to } = join_delegate_1.invokeJoinDelegate(query, joinDecl.toTable, () => joinDecl.from, () => joinDecl.to);
    const { _distinct, _sqlCalcFoundRows, _parentJoins, _selects, _where, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins: [
            ...query._joins,
            new join_1.Join({
                aliasedTable: joinDecl.toTable,
                columns: joinDecl.toTable.columns,
                nullable: joinDecl.nullable,
            }, joinDecl.joinType, from, to),
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
exports.useJoin = useJoin;
//# sourceMappingURL=use-join.js.map