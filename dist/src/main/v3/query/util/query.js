"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../../aliased-table");
const column_1 = require("../../column");
function queryTreeJoins(query) {
    const joins = query._joins;
    if (joins == undefined || joins.length == 0) {
        return [];
    }
    const result = [];
    result.push(aliased_table_1.AliasedTable.queryTree(joins[0].aliasedTable));
    for (let i = 1; i < joins.length; ++i) {
        const join = joins[i];
        result.push(`${join.joinType} JOIN`);
        result.push(aliased_table_1.AliasedTable.queryTree(join.aliasedTable));
        if (join.from.length == 0) {
            continue;
        }
        result.push("ON");
        result.push(join.from
            .map((from, index) => {
            const to = join.to[index];
            return [
                column_1.ColumnUtil.queryTree(to),
                "=",
                column_1.ColumnUtil.queryTree(from),
            ].join(" ");
        })
            .join(" AND "));
    }
    return result;
}
exports.queryTreeJoins = queryTreeJoins;
//# sourceMappingURL=query.js.map