"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../../aliased-table");
const column_1 = require("../../column");
const expr_select_item_1 = require("../../expr-select-item");
const column_map_1 = require("../../column-map");
function queryTreeSelects(query) {
    const selects = query._selects;
    const result = [];
    result.push("SELECT");
    for (let item of selects) {
        if (result.length > 1) {
            result.push(",");
        }
        if (column_1.ColumnUtil.isColumn(item)) {
            result.push(column_1.ColumnUtil.queryTree(item));
        }
        else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(item)) {
            result.push(expr_select_item_1.ExprSelectItemUtil.queryTree(item));
        }
        else if (column_map_1.ColumnMapUtil.isColumnMap(item)) {
            result.push(column_map_1.ColumnMapUtil.queryTree(item));
        }
    }
    return result;
}
exports.queryTreeSelects = queryTreeSelects;
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