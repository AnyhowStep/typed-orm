"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const of_entity_identifier_1 = require("./of-entity-identifier");
function fetchLatestOrError(log, connection, entityIdentifier) {
    return query_1.QueryUtil
        .select(of_entity_identifier_1.latest(log, entityIdentifier), ((c) => [c]))
        .fetchOne(connection);
}
exports.fetchLatestOrError = fetchLatestOrError;
//# sourceMappingURL=fetch-latest-or-error.js.map