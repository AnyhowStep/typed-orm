"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../predicate");
function uniqueColumnNames(table) {
    const result = new Set();
    for (let c in table.columns) {
        result.add(c);
    }
    for (let p of table.parents) {
        for (let c in p.columns) {
            result.add(c);
        }
    }
    return result;
}
exports.uniqueColumnNames = uniqueColumnNames;
function uniqueGeneratedColumnNames(table) {
    const result = new Set();
    for (let c of table.generated) {
        result.add(c);
    }
    for (let p of table.parents) {
        for (let c of p.generated) {
            result.add(c);
        }
    }
    return result;
}
exports.uniqueGeneratedColumnNames = uniqueGeneratedColumnNames;
function uniqueNonGeneratedColumnNames(table) {
    const columnNames = uniqueColumnNames(table);
    const generatedColumnNames = uniqueGeneratedColumnNames(table);
    const result = new Set();
    for (let c of columnNames) {
        if (!generatedColumnNames.has(c)) {
            result.add(c);
        }
    }
    return result;
}
exports.uniqueNonGeneratedColumnNames = uniqueNonGeneratedColumnNames;
function uniqueOptionalColumnNames(table) {
    const result = new Set();
    for (let c of uniqueNonGeneratedColumnNames(table)) {
        if (predicate_1.isNullable(table, c) || predicate_1.hasExplicitDefaultValue(table, c)) {
            result.add(c);
        }
    }
    return result;
}
exports.uniqueOptionalColumnNames = uniqueOptionalColumnNames;
function uniqueRequiredColumnNames(table) {
    const result = new Set();
    for (let c of uniqueNonGeneratedColumnNames(table)) {
        if (!predicate_1.isNullable(table, c) && !predicate_1.hasExplicitDefaultValue(table, c)) {
            result.add(c);
        }
    }
    return result;
}
exports.uniqueRequiredColumnNames = uniqueRequiredColumnNames;
//# sourceMappingURL=column-names.js.map