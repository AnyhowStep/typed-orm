"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_ref_1 = require("../../../column-ref");
const query_1 = require("../../../query");
const update_1 = require("../../../update");
const from_1 = require("./from");
function toAssignmentRef(query, map) {
    const ref = {};
    for (let columnName in map) {
        for (let join of query._joins) {
            if (columnName in join.columns) {
                let m = ref[join.aliasedTable.alias];
                if (m == undefined) {
                    m = {};
                    ref[join.aliasedTable.alias] = m;
                }
                m[columnName] = map[columnName];
            }
        }
    }
    return ref;
}
function updateZeroOrOneByCk(connection, table, ck, delegate) {
    if (table.parents.length == 0) {
        return query_1.QueryUtil.newInstance()
            .from(table)
            .whereEqCandidateKey(table, ck)
            .set(delegate)
            .executeUpdateZeroOrOne(connection);
    }
    let query = from_1.from(table);
    query = query_1.QueryUtil.whereEqCandidateKey(query, table, ck);
    const queryRef = column_ref_1.ColumnRefUtil.fromJoinArray(query._joins);
    const assignmentMap = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef));
    const update = query_1.QueryUtil.set(query, () => toAssignmentRef(query, assignmentMap));
    return update_1.UpdateUtil.executeUpdateZeroOrOne(update, connection);
}
exports.updateZeroOrOneByCk = updateZeroOrOneByCk;
//# sourceMappingURL=update-zero-or-one-by-ck.js.map