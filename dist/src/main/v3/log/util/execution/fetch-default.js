"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
const query_1 = require("../../../query");
async function fetchDefault(log, connection, entityIdentifier) {
    const assertDelegate = operation_1.entityIdentifierAssertDelegate(log);
    entityIdentifier = assertDelegate(`${log.table.alias}.entityIdentifier`, entityIdentifier);
    //If the entity does not exist, there is no default value
    await query_1.QueryUtil.assertExistsByCk(connection, log.entity, entityIdentifier);
    return log.copyDefaultsDelegate({
        entityIdentifier,
        connection
    }).then((copyDefaults) => {
        return {
            ...copyDefaults,
            ...log.trackedDefaults,
            ...entityIdentifier,
        };
    });
}
exports.fetchDefault = fetchDefault;
//# sourceMappingURL=fetch-default.js.map