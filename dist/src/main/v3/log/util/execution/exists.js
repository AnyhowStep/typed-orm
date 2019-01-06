"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
const query_1 = require("../../../query");
function exists(log, entityIdentifier, connection) {
    const assertDelegate = operation_1.entityIdentifierAssertDelegate(log);
    entityIdentifier = assertDelegate(`${log.table.alias}.entityIdentifier`, entityIdentifier);
    return query_1.QueryUtil.newInstance()
        .from(log.table)
        .whereEqColumns(log.table, entityIdentifier)
        .exists(connection);
}
exports.exists = exists;
//# sourceMappingURL=exists.js.map