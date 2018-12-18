"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const column_ref_1 = require("../../../column-ref");
const expr_1 = require("../../../expr");
const column_1 = require("../../../column");
const order_1 = require("../../../order");
//Must be called after `FROM` or `UNION`, because there's little point
//in ordering one row
function unionOrderBy(query, delegate) {
    if (query._joins == undefined && query._unions == undefined) {
        throw new Error(`Can only use UNION ORDER BY after FROM or UNION clause`);
    }
    const queryRef = column_ref_1.ColumnRefUtil.fromQuerySelects(query);
    const rawOrders = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef), query);
    const orders = order_1.OrderUtil.Array.fromRawOrderArray(rawOrders);
    for (let order of orders) {
        const orderExpr = order[0];
        if (column_1.ColumnUtil.isColumn(orderExpr)) {
            column_ref_1.ColumnRefUtil.assertHasColumnIdentifier(queryRef, orderExpr);
        }
        else if (expr_1.ExprUtil.isExpr(orderExpr)) {
            column_ref_1.ColumnRefUtil.assertIsSubset(orderExpr.usedRef, queryRef);
        }
    }
    return new query_1.Query({
        ...query,
        _unionOrders: (query._unionOrders == undefined ?
            orders :
            [...query._unionOrders, ...orders])
    });
}
exports.unionOrderBy = unionOrderBy;
//# sourceMappingURL=union-order-by.js.map