"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
function fetchDefault(log, entityIdentifier, connection) {
    const assertDelegate = operation_1.entityIdentifierAssertDelegate(log);
    entityIdentifier = assertDelegate(`${log.table.alias}.entityIdentifier`, entityIdentifier);
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