"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const of_entity_identifier_1 = require("./of-entity-identifier");
function fetchLatestOrderOrUndefined(log, connection, entityIdentifier) {
    return query_1.QueryUtil.fetchValueOrUndefined(of_entity_identifier_1.latestOrderQuery(log, entityIdentifier), connection);
}
exports.fetchLatestOrderOrUndefined = fetchLatestOrderOrUndefined;
//# sourceMappingURL=fetch-latest-order-or-undefined.js.map