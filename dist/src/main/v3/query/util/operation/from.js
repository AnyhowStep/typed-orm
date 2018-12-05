"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const join_1 = require("../../../join");
const predicate_1 = require("../predicate");
//Must be done before any JOINs, as per MySQL
//TODO The aliasedTable must not be in parentJoins
function from(query, aliasedTable) {
    if (query.joins != undefined) {
        throw new Error(`FROM clause not allowed more than once`);
    }
    predicate_1.assertUniqueJoinTarget(query, aliasedTable);
    const { parentJoins, unions, selects, limit, unionLimit, extraData, } = query;
    return new query_1.Query({
        joins: [
            new join_1.Join({
                aliasedTable,
                columns: aliasedTable.columns,
                nullable: false,
            }, join_1.JoinType.FROM, [], []),
        ],
        parentJoins,
        unions,
        selects,
        limit,
        unionLimit,
    }, extraData);
}
exports.from = from;
//# sourceMappingURL=from.js.map