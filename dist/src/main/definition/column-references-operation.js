"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("./column");
const type_util_1 = require("@anyhowstep/type-util");
function toNullableColumnReferences(columnReferences) {
    const result = {};
    for (let table in columnReferences) {
        if (!columnReferences.hasOwnProperty(table)) {
            continue;
        }
        for (let column in columnReferences[table]) {
            if (!columnReferences[table].hasOwnProperty(column)) {
                continue;
            }
            const c = columnReferences[table][column];
            if (result[table] == undefined) {
                result[table] = {};
            }
            result[table][column] = new column_1.Column(c.table, c.name, sd.nullable(c.assertDelegate));
        }
    }
    return result;
}
exports.toNullableColumnReferences = toNullableColumnReferences;
function copyReferences(columnReferences) {
    const result = type_util_1.spread(columnReferences);
    for (let table in columnReferences) {
        if (columnReferences.hasOwnProperty(table)) {
            result[table] = type_util_1.spread(result[table]);
        }
    }
    return result;
}
exports.copyReferences = copyReferences;
function replaceColumnOfReference(columnReferences, newColumn) {
    if (columnReferences[newColumn.table] != undefined &&
        columnReferences[newColumn.table][newColumn.name] != undefined) {
        const curColumn = columnReferences[newColumn.table][newColumn.name];
        if (curColumn.table == newColumn.table && curColumn.name == newColumn.name) {
            //Create a copy
            columnReferences = copyReferences(columnReferences);
            columnReferences[newColumn.table][newColumn.name] = newColumn;
            return columnReferences;
        }
        else {
            return columnReferences;
        }
    }
    else {
        //No column to replace
        return columnReferences;
    }
}
exports.replaceColumnOfReference = replaceColumnOfReference;
function isPartialColumnReferences(columnReferences, mixed) {
    if (!(mixed instanceof Object)) {
        return false;
    }
    for (let table in mixed) {
        if (!mixed.hasOwnProperty(table)) {
            continue;
        }
        if (columnReferences[table] == undefined) {
            //Is using table that does not exist in references
            return false;
        }
        for (let name in mixed[table]) {
            if (!mixed[table].hasOwnProperty(name)) {
                continue;
            }
            if (columnReferences[table][name] == undefined) {
                //Is using column that does not exist in references
                return false;
            }
        }
    }
    return true;
}
exports.isPartialColumnReferences = isPartialColumnReferences;
function combineReferences(t, u) {
    const result = copyReferences(t);
    for (let table in u) {
        for (let name in u[table]) {
            if (result[table] == undefined) {
                result[table] = {};
            }
            result[table][name] = u[table][name];
        }
    }
    return result;
}
exports.combineReferences = combineReferences;
function columnReferencesToSchema(columnReferences) {
    const result = {};
    for (let table in columnReferences) {
        const fields = {};
        for (let column in columnReferences[table]) {
            const c = columnReferences[table][column];
            fields[c.name] = c.assertDelegate;
        }
        result[table] = sd.toSchema(fields);
    }
    return sd.toSchema(result);
}
exports.columnReferencesToSchema = columnReferencesToSchema;
//# sourceMappingURL=column-references-operation.js.map