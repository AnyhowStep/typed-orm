"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../../expr");
const latest_value_query_1 = require("./latest-value-query");
function latestValueOrNull(log, entityIdentifier, delegate) {
    const query = latest_value_query_1.latestValueQuery(log, entityIdentifier, delegate);
    const expr = expr_1.ExprUtil.fromRawExpr(query);
    const result = expr.as(query._selects[0].name);
    return result;
}
exports.latestValueOrNull = latestValueOrNull;
//# sourceMappingURL=latest-value-or-null.js.map