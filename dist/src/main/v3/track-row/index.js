"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../table");
const primitive_expr_1 = require("../primitive-expr");
var TrackRowUtil;
(function (TrackRowUtil) {
    function toInsertRowLiteral(log, newRow, prvRow) {
        //We do not provide a value for `latestOrder`.
        //It should be generated or have an explicit default value
        //set on the database.
        const insertRow = {};
        //Copy the previous row's `entityIdentifier`
        for (let columnName of log.entityIdentifier) {
            insertRow[columnName] = prvRow[columnName];
        }
        //Copy the previous row's `tracked` if we do not provide a value
        let changed = false;
        for (let columnName of log.tracked) {
            const rawNewTrackedValue = newRow[columnName];
            if (rawNewTrackedValue === undefined) {
                insertRow[columnName] = prvRow[columnName];
            }
            else {
                const newTrackedValue = log.table.columns[columnName].assertDelegate(`${log.table.alias}.${columnName}`, rawNewTrackedValue);
                insertRow[columnName] = newTrackedValue;
                if (!primitive_expr_1.PrimitiveExprUtil.isEqual(newTrackedValue, prvRow[columnName])) {
                    changed = true;
                }
            }
        }
        //We expect new values for all required `doNotCopy` columns
        for (let columnName of log.doNotCopy) {
            const newDoNotCopyValue = newRow[columnName];
            if (newDoNotCopyValue === undefined) {
                if (table_1.TableUtil.isRequired(log.table, columnName)) {
                    throw new Error(`Expected a value for ${log.table.alias}.${columnName}`);
                }
                else {
                    continue;
                }
            }
            insertRow[columnName] = log.table.columns[columnName].assertDelegate(`${log.table.alias}.${columnName}`, newDoNotCopyValue);
        }
        //Copy the previous row's `copy`
        for (let columnName of log.copy) {
            insertRow[columnName] = prvRow[columnName];
        }
        return {
            changed,
            insertRow,
        };
    }
    TrackRowUtil.toInsertRowLiteral = toInsertRowLiteral;
})(TrackRowUtil = exports.TrackRowUtil || (exports.TrackRowUtil = {}));
//# sourceMappingURL=index.js.map