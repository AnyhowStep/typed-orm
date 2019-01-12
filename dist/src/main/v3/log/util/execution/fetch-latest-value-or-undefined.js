"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const of_entity_identifier_1 = require("./of-entity-identifier");
function fetchLatestValueOrUndefined(log, connection, entityIdentifier, delegate) {
    return query_1.QueryUtil.fetchValueOrUndefined(of_entity_identifier_1.latestValueQuery(log, entityIdentifier, delegate), connection);
}
exports.fetchLatestValueOrUndefined = fetchLatestValueOrUndefined;
//# sourceMappingURL=fetch-latest-value-or-undefined.js.map