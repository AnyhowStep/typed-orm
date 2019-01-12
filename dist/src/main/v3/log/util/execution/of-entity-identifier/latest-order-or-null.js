"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../../expr");
const latest_order_query_1 = require("./latest-order-query");
function latestOrderOrNull(log, entityIdentifier) {
    const expr = expr_1.ExprUtil.fromRawExpr(latest_order_query_1.latestOrderQuery(log, entityIdentifier));
    const result = expr.as(log.latestOrder[0].name);
    return result;
}
exports.latestOrderOrNull = latestOrderOrNull;
//# sourceMappingURL=latest-order-or-null.js.map