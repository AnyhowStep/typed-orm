"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const latest_value_query_1 = require("./latest-value-query");
function fetchLatestValueOrUndefined(log, entityIdentifier, delegate, connection) {
    return query_1.QueryUtil.fetchValueOrUndefined(latest_value_query_1.latestValueQuery(log, entityIdentifier, delegate), connection);
}
exports.fetchLatestValueOrUndefined = fetchLatestValueOrUndefined;
//# sourceMappingURL=fetch-latest-value-or-undefined.js.map