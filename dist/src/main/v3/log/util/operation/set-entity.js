"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
function setEntity(log, entity) {
    if (log.table.alias == entity.alias) {
        throw new Error(`Cannot use alias ${entity.alias} for entity`);
    }
    const { table, entityIdentifier, joinDeclaration, latestOrder, tracked, doNotCopy, copy, copyDefaultsDelegate, trackedDefaults, } = log;
    return new log_1.Log({
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        copyDefaultsDelegate,
        trackedDefaults,
    });
}
exports.setEntity = setEntity;
//# sourceMappingURL=set-entity.js.map