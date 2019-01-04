"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const operation_1 = require("../operation");
function latestQuery(log, entityIdentifier) {
    const assertDelegate = operation_1.entityIdentifierAssertDelegate(log);
    entityIdentifier = assertDelegate(`${log.table.alias}.entityIdentifier`, entityIdentifier);
    return query_1.QueryUtil.newInstance()
        .from(log.table)
        .whereEqColumns(log.table, entityIdentifier)
        .orderBy(() => [log.latestOrder])
        .limit(1);
}
exports.latestQuery = latestQuery;
//# sourceMappingURL=latest-query.js.map