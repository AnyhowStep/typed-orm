"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
const column_identifier_map_1 = require("../../../column-identifier-map");
const column_map_1 = require("../../../column-map");
function setDoNotCopy(log, delegate) {
    const columns = column_map_1.ColumnMapUtil.pick(log.table.columns, log.copy);
    const doNotCopy = delegate(columns);
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifiers(columns, doNotCopy);
    const { table, entity, entityIdentifier, joinDeclaration, latestOrder, tracked, trackedDefaults, } = log;
    const copy = log.copy
        .filter((columnName) => {
        return !doNotCopy.some(c => c.name == columnName);
    });
    return new log_1.Log({
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked,
        doNotCopy: doNotCopy.map(c => c.name),
        copy,
        copyDefaultsDelegate: ((copy.length == 0) ?
            (() => Promise.resolve({})) :
            undefined),
        trackedDefaults,
    });
}
exports.setDoNotCopy = setDoNotCopy;
//# sourceMappingURL=set-do-not-copy.js.map