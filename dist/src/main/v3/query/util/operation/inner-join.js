"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const join_delegate_1 = require("./join-delegate");
const join_1 = require("../../../join");
function innerJoin(query, aliasedTable, fromDelegate, toDelegate) {
    const { from, to } = join_delegate_1.invokeJoinDelegate(query, aliasedTable, fromDelegate, toDelegate);
    const { parentJoins, unions, selects, limit, unionLimit, extraData, } = query;
    return new query_1.Query({
        joins: [
            ...query.joins,
            new join_1.Join({
                aliasedTable,
                columns: aliasedTable.columns,
                nullable: false,
            }, join_1.JoinType.INNER, from, to),
        ],
        parentJoins,
        unions,
        selects,
        limit,
        unionLimit,
    }, extraData);
}
exports.innerJoin = innerJoin;
//# sourceMappingURL=inner-join.js.map