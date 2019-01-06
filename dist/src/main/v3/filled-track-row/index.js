"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilledTrackRowUtil;
(function (FilledTrackRowUtil) {
    function isFilledTrackRow(log, newRow) {
        for (let columnName of log.tracked) {
            if (newRow[columnName] === undefined) {
                return false;
            }
        }
        return true;
    }
    FilledTrackRowUtil.isFilledTrackRow = isFilledTrackRow;
    function assertFilledTrackRow(log, newRow) {
        for (let columnName of log.tracked) {
            if (newRow[columnName] === undefined) {
                throw new Error(`Expected a value for ${log.table.alias}.${columnName}`);
            }
        }
        return newRow;
    }
    FilledTrackRowUtil.assertFilledTrackRow = assertFilledTrackRow;
    async function toInsertLiteralRow(log, entityIdentifier, newRow, connection) {
        const copyDefaults = await log.copyDefaultsDelegate({
            entityIdentifier,
            connection,
        });
        const insertRow = {};
        for (let columnName of log.entityIdentifier) {
            insertRow[columnName] = entityIdentifier[columnName];
        }
        for (let columnName of log.tracked) {
            insertRow[columnName] = newRow[columnName];
        }
        for (let columnName of log.doNotCopy) {
            insertRow[columnName] = newRow[columnName];
        }
        for (let columnName of log.copy) {
            insertRow[columnName] = copyDefaults[columnName];
        }
        return insertRow;
    }
    FilledTrackRowUtil.toInsertLiteralRow = toInsertLiteralRow;
})(FilledTrackRowUtil = exports.FilledTrackRowUtil || (exports.FilledTrackRowUtil = {}));
//# sourceMappingURL=index.js.map