"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const of_entity_identifier_1 = require("./of-entity-identifier");
function fetchLatestValueOrDefault(log, connection, entityIdentifier, delegate) {
    return query_1.QueryUtil.selectExpr(query_1.QueryUtil.newInstance(), (() => of_entity_identifier_1.latestValue(log, entityIdentifier, delegate))).fetchValue(connection);
}
exports.fetchLatestValueOrDefault = fetchLatestValueOrDefault;
//# sourceMappingURL=fetch-latest-value-or-default.js.map