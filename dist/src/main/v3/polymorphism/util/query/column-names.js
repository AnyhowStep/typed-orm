"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return [...result];
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
    return [...result];
}
exports.uniqueGeneratedColumnNames = uniqueGeneratedColumnNames;
//# sourceMappingURL=column-names.js.map