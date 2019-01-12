"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const latest_value_or_null_1 = require("./latest-value-or-null");
function latestValue(log, entityIdentifier, delegate) {
    const expr = latest_value_or_null_1.latestValueOrNull(log, entityIdentifier, delegate);
    return query_1.QueryUtil.coalesce(expr, log.trackedDefaults[expr.alias]).as(expr.alias);
}
exports.latestValue = latestValue;
//# sourceMappingURL=latest-value.js.map