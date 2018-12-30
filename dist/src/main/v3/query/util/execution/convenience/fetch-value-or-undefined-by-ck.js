"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
const column_1 = require("../../../../column");
const expr_1 = require("../../../../expr");
const expr_select_item_1 = require("../../../../expr-select-item");
function fetchValueOrUndefinedByCk(connection, table, ck, delegate) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .select((columns, query) => {
        const rawExpr = delegate(columns, query);
        const selectItem = (column_1.ColumnUtil.isColumn(rawExpr) ?
            rawExpr :
            expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(rawExpr) ?
                rawExpr :
                expr_1.ExprUtil.as(expr_1.ExprUtil.fromRawExpr(rawExpr), "value"));
        return [selectItem];
    })
        .fetchValueOrUndefined(connection);
}
exports.fetchValueOrUndefinedByCk = fetchValueOrUndefinedByCk;
//# sourceMappingURL=fetch-value-or-undefined-by-ck.js.map