"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
const column_identifier_map_1 = require("../../../column-identifier-map");
const column_map_1 = require("../../../column-map");
function setTracked(log, delegate) {
    const columns = column_map_1.ColumnMapUtil.pick(log.table.columns, log.copy);
    const tracked = delegate(columns);
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifiers(columns, tracked);
    const { table, entity, entityIdentifier, joinDeclaration, latestOrder, doNotCopy, copyDefaultsDelegate, trackedDefaults, } = log;
    const copy = log.copy
        .filter((columnName) => {
        return !tracked.some(c => c.name == columnName);
    });
    return new log_1.Log({
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked: tracked.map(c => c.name),
        doNotCopy,
        copy,
        copyDefaultsDelegate,
        trackedDefaults,
    });
}
exports.setTracked = setTracked;
//# sourceMappingURL=set-tracked.js.map