"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
const table_1 = require("../../../table");
const entity_identifier_assert_delegate_1 = require("./entity-identifier-assert-delegate");
function setCopyDefaultsDelegate(log, rawCopyDefaultsDelegate) {
    const requiredColumnNames = table_1.TableUtil.requiredColumnNames(log.table)
        .filter(columnName => (log.copy.indexOf(columnName) >= 0));
    const optionalColumnNames = table_1.TableUtil.optionalColumnNames(log.table)
        .filter(columnName => (log.copy.indexOf(columnName) >= 0));
    const copyDefaultsDelegate = (args) => {
        const assertDelegate = entity_identifier_assert_delegate_1.entityIdentifierAssertDelegate(log);
        args.entityIdentifier = assertDelegate(`${log.table.alias}.entityIdentifier`, args.entityIdentifier);
        const rawResult = rawCopyDefaultsDelegate(args);
        const result = {};
        for (let columnName of requiredColumnNames) {
            const rawValue = rawResult[columnName];
            if (rawValue === undefined) {
                throw new Error(`Expected a value for ${log.table.alias}.${columnName}`);
            }
            result[columnName] = log.table.columns[columnName].assertDelegate(`${log.table.alias}.${columnName}`, rawValue);
        }
        for (let columnName of optionalColumnNames) {
            const rawValue = rawResult[columnName];
            if (rawValue === undefined) {
                continue;
            }
            result[columnName] = log.table.columns[columnName].assertDelegate(`${log.table.alias}.${columnName}`, rawValue);
        }
        return result;
    };
    const { table, entity, entityIdentifier, joinDeclaration, latestOrder, tracked, doNotCopy, copy, trackedDefaults, } = log;
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
exports.setCopyDefaultsDelegate = setCopyDefaultsDelegate;
//# sourceMappingURL=set-copy-defaults-delegate.js.map