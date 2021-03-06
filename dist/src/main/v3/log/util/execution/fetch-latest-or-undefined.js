"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const of_entity_identifier_1 = require("./of-entity-identifier");
function fetchLatestOrUndefined(log, connection, entityIdentifier) {
    return query_1.QueryUtil
        .select(of_entity_identifier_1.latest(log, entityIdentifier), ((c) => [c]))
        .fetchZeroOrOne(connection);
}
exports.fetchLatestOrUndefined = fetchLatestOrUndefined;
//# sourceMappingURL=fetch-latest-or-undefined.js.map