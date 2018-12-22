"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../predicate");
const column_ref_1 = require("../../../column-ref");
const column_1 = require("../../../column");
const column_map_1 = require("../../../column-map");
function invokeJoinDelegate(query, aliasedTable, fromDelegate, toDelegate) {
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
    return {
        from: from,
        to: to,
    };
}
exports.invokeJoinDelegate = invokeJoinDelegate;
//# sourceMappingURL=join-delegate.js.map