"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
const join_1 = require("../../../../join");
const column_ref_1 = require("../../../../column-ref");
const column_1 = require("../../../../column");
const column_map_1 = require("../../../../column-map");
const query_1 = require("../../../query");
function join(query, aliasedTable, fromDelegate, toDelegate, nullable, joinType) {
    if (query._joins == undefined) {
        throw new Error(`Cannot JOIN before FROM clause`);
    }
    predicate_1.assertValidJoinTarget(query, aliasedTable);
    const joins = query._joins;
    const fromRef = column_ref_1.ColumnRefUtil.fromJoinArray(joins);
    const from = fromDelegate(column_ref_1.ColumnRefUtil.toConvenient(fromRef));
    column_1.ColumnUtil.Array.assertIsColumnArray(from);
    const to = toDelegate(aliasedTable.columns);
    column_1.ColumnUtil.Array.assertIsColumnArray(to);
    if (from.length != to.length) {
        throw new Error(`Expected JOIN to have ${from.length} target columns`);
    }
    if (from.length == 0) {
        throw new Error(`Expected JOIN to have at least one column for ON clause`);
    }
    column_ref_1.ColumnRefUtil.assertHasColumnIdentifiers(fromRef, from);
    column_map_1.ColumnMapUtil.assertHasColumnIdentifiers(aliasedTable.columns, to);
    const { _distinct, _sqlCalcFoundRows, _parentJoins, _selects, _where, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins: [
            ...query._joins,
            new join_1.Join({
                aliasedTable,
                columns: aliasedTable.columns,
                nullable,
            }, joinType, from, to),
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
exports.join = join;
//# sourceMappingURL=join.js.map