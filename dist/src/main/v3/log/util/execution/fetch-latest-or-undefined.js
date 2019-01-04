"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const latest_query_1 = require("./latest-query");
function fetchLatestOrUndefined(log, entityIdentifier, connection) {
    return query_1.QueryUtil
        .select(latest_query_1.latestQuery(log, entityIdentifier), ((c) => [c]))
        .fetchZeroOrOne(connection);
}
exports.fetchLatestOrUndefined = fetchLatestOrUndefined;
//# sourceMappingURL=fetch-latest-or-undefined.js.map