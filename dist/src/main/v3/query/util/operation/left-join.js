"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const predicate_1 = require("../predicate");
const join_1 = require("../../../join");
const column_ref_1 = require("../../../column-ref");
const column_map_1 = require("../../../column-map");
function leftJoin(query, aliasedTable, fromDelegate, toDelegate) {
    if (query.joins == undefined) {
        throw new Error(`Cannot JOIN before FROM clause`);
    }
    predicate_1.assertUniqueJoinTarget(query, aliasedTable);
    const joins = query.joins;
    const fromRef = column_ref_1.ColumnRefUtil.fromJoinArray(joins);
    const from = fromDelegate(column_ref_1.ColumnRefUtil.toConvenient(fromRef));
    const to = toDelegate(aliasedTable.columns);
    if (from.length != to.length) {
        throw new Error(`Expected JOIN to have ${from.length} target columns`);
    }
    column_ref_1.ColumnRefUtil.assertHasColumnIdentifiers(fromRef, from);
    column_map_1.ColumnMapUtil.assertHasColumnIdentifiers(aliasedTable.columns, to);
    const { parentJoins, unions, selects, limit, unionLimit, extraData, } = query;
    return new query_1.Query({
        joins: [
            ...query.joins,
            new join_1.Join({
                aliasedTable,
                columns: aliasedTable.columns,
                nullable: true,
            }, join_1.JoinType.LEFT, from, to),
        ],
        parentJoins,
        unions,
        selects,
        limit,
        unionLimit,
    }, extraData);
}
exports.leftJoin = leftJoin;
//# sourceMappingURL=left-join.js.map