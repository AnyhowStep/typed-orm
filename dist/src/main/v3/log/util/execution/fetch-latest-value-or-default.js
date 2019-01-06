"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const latest_value_expr_1 = require("./latest-value-expr");
function fetchLatestValueOrDefault(log, entityIdentifier, delegate, connection) {
    return query_1.QueryUtil.selectExpr(query_1.QueryUtil.newInstance(), (() => latest_value_expr_1.latestValueExpr(log, entityIdentifier, delegate))).fetchValue(connection);
}
exports.fetchLatestValueOrDefault = fetchLatestValueOrDefault;
//# sourceMappingURL=fetch-latest-value-or-default.js.map