"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const predicate_1 = require("../predicate");
const join_1 = require("../../../join");
const column_ref_1 = require("../../../column-ref");
const column_map_1 = require("../../../column-map");
const join_array_1 = require("../../../join-array");
function rightJoin(query, aliasedTable, fromDelegate, toDelegate) {
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
    if (from.length == 0) {
        throw new Error(`Expected JOIN to have at least one column for ON clause`);
    }
    column_ref_1.ColumnRefUtil.assertHasColumnIdentifiers(fromRef, from);
    column_map_1.ColumnMapUtil.assertHasColumnIdentifiers(aliasedTable.columns, to);
    const { parentJoins, unions, selects, limit, unionLimit, extraData, } = query;
    const newJoins = [
        ...join_array_1.JoinArrayUtil.toNullable(joins),
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