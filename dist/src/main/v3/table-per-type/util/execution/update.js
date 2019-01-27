"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_ref_1 = require("../../../column-ref");
const query_1 = require("../../../query");
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
function update(table, where, delegate) {
    if (table.parents.length == 0) {
        const result = query_1.QueryUtil.newInstance()
            .from(table)
            .__unsafeWhere(() => where)
            .set(delegate);
        return result;
    }
    let query = from_1.from(table);
    query = query_1.QueryUtil.where(query, () => where);
    const queryRef = column_ref_1.ColumnRefUtil.fromJoinArray(query._joins);
    const assignmentMap = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef));
    const update = query_1.QueryUtil.set(query, () => toAssignmentRef(query, assignmentMap));
    return update;
}
exports.update = update;
//# sourceMappingURL=update.js.map