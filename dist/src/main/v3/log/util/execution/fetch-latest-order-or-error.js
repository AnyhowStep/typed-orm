"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const of_entity_identifier_1 = require("./of-entity-identifier");
function fetchLatestOrderOrError(log, connection, entityIdentifier) {
    return query_1.QueryUtil.fetchValue(of_entity_identifier_1.latestOrderQuery(log, entityIdentifier), connection);
}
exports.fetchLatestOrderOrError = fetchLatestOrderOrError;
//# sourceMappingURL=fetch-latest-order-or-error.js.map