"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const latest_value_query_1 = require("./latest-value-query");
function fetchLatestValueOrError(log, entityIdentifier, delegate, connection) {
    return query_1.QueryUtil.fetchValue(latest_value_query_1.latestValueQuery(log, entityIdentifier, delegate), connection);
}
exports.fetchLatestValueOrError = fetchLatestValueOrError;
//# sourceMappingURL=fetch-latest-value-or-error.js.map