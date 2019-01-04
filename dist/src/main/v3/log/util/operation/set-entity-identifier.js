"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
const column_identifier_map_1 = require("../../../column-identifier-map");
const column_map_1 = require("../../../column-map");
function setEntityIdentifier(log, delegate) {
    const columns = column_map_1.ColumnMapUtil.pick(log.table.columns, log.copy);
    const entityIdentifier = delegate(columns);
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifiers(columns, entityIdentifier);
    const { table, latestOrder, tracked, doNotCopy, staticDefaultValue, dynamicDefaultValueDelegate, } = log;
    const copy = log.copy
        .filter((columnName) => {
        return !entityIdentifier.some(c => c.name == columnName);
    });
    return new log_1.Log({
        table,
        entityIdentifier: entityIdentifier.map(c => c.name),
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        staticDefaultValue,
        dynamicDefaultValueDelegate,
    });
}
exports.setEntityIdentifier = setEntityIdentifier;
//# sourceMappingURL=set-entity-identifier.js.map