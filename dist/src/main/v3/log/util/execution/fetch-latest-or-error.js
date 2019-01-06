"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const latest_query_1 = require("./latest-query");
function fetchLatestOrError(log, entityIdentifier, connection) {
    return query_1.QueryUtil
        .select(latest_query_1.latestQuery(log, entityIdentifier), ((c) => [c]))
        .fetchOne(connection);
}
exports.fetchLatestOrError = fetchLatestOrError;
//# sourceMappingURL=fetch-latest-or-error.js.map