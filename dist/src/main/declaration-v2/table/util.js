"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../column");
const unique_key_collection_1 = require("../unique-key-collection");
var TableUtil;
(function (TableUtil) {
    //TODO Move these elsewhere, they do not belong here
    function validateInsertRow(table, row) {
        for (let name in row) {
            if (!table.columns.hasOwnProperty(name)) {
                throw new Error(`Unexpected column ${name}; it does not exist on table ${table.alias}`);
            }
            if (table.data.isGenerated.hasOwnProperty(name)) {
                throw new Error(`Unexpected column ${name}; it is a generated column on table ${table.alias}, you cannot specify a value for it`);
            }
            const value = row[name];
            if (value === undefined && !table.data.hasDefaultValue.hasOwnProperty(name)) {
                throw new Error(`Expected a value for column ${name} on table ${table.alias}; received undefined`);
            }
            //If we specify a value, it better match our assertion
            if (!(value instanceof Object) || (value instanceof Date)) {
                row[name] = table.columns[name].assertDelegate(name, value);
            }
        }
    }
    TableUtil.validateInsertRow = validateInsertRow;
    function validateInsertRows(table, rows) {
        for (let row of rows) {
            validateInsertRow(table, row);
        }
    }
    TableUtil.validateInsertRows = validateInsertRows;
    function validateUpdateAssignmentReferences(joins, assignmentReferences) {
        for (let tableAlias in assignmentReferences) {
            const join = joins.find((join) => join.table.alias == tableAlias);
            if (join == undefined) {
                throw new Error(`Unknown table alias ${tableAlias} in assignment references`);
            }
            const assignmentCollection = assignmentReferences[tableAlias];
            for (let columnName in assignmentCollection) {
                const column = join.columns[columnName];
                if (!(column instanceof column_1.Column)) {
                    throw new Error(`Unknown column ${tableAlias}.${columnName} in assignment references`);
                }
                const assignmentValue = assignmentCollection[columnName];
                if (!(assignmentValue instanceof Object) || (assignmentValue instanceof Date)) {
                    assignmentCollection[columnName] = column.assertDelegate(columnName, assignmentValue);
                }
            }
        }
    }
    TableUtil.validateUpdateAssignmentReferences = validateUpdateAssignmentReferences;
    function uniqueKeyAssertDelegate(table) {
        if (table.data.uniqueKeys == undefined) {
            return ((name, _mixed) => {
                throw new Error(`${name} is not a unique key of ${table.alias}; the table has no unique keys`);
            });
        }
        return unique_key_collection_1.UniqueKeyCollectionUtil.assertDelegate(table.data.uniqueKeys, table.columns);
    }
    TableUtil.uniqueKeyAssertDelegate = uniqueKeyAssertDelegate;
})(TableUtil = exports.TableUtil || (exports.TableUtil = {}));
//# sourceMappingURL=util.js.map