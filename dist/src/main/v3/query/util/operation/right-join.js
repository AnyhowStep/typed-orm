"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const join_delegate_1 = require("./join-delegate");
const join_1 = require("../../../join");
const join_array_1 = require("../../../join-array");
function rightJoin(query, aliasedTable, fromDelegate, toDelegate) {
    const { from, to } = join_delegate_1.invokeJoinDelegate(query, aliasedTable, fromDelegate, toDelegate);
    const { parentJoins, unions, selects, limit, unionLimit, extraData, } = query;
    const newJoins = [
        ...join_array_1.JoinArrayUtil.toNullable(query.joins),
        new join_1.Join({
            aliasedTable,
            columns: aliasedTable.columns,
            nullable: false,
        }, join_1.JoinType.RIGHT, from, to),
    ];
    return new query_1.Query({
        joins: newJoins,
        parentJoins,
        unions,
        selects,
        limit,
        unionLimit,
    }, extraData);
}
exports.rightJoin = rightJoin;
//# sourceMappingURL=right-join.js.map