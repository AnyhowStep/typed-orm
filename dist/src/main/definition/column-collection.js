"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("./column");
function isColumn(raw) {
    return (raw instanceof Object &&
        !(raw instanceof Function) &&
        !(raw instanceof sd.Field));
}
function toColumn(table, name, raw) {
    if (isColumn(raw)) {
        if (raw.table == table && raw.name == name) {
            return raw;
        }
        else {
            return new column_1.Column(table, name, raw.assertDelegate);
        }
    }
    else {
        return new column_1.Column(table, name, sd.toAssertDelegateExact(raw));
    }
}
function toColumnCollection(alias, rawColumns) {
    const result = {};
    for (let name in rawColumns) {
        if (!rawColumns.hasOwnProperty(name)) {
            continue;
        }
        const rawColumn = rawColumns[name];
        const column = toColumn(alias, name, rawColumn);
        result[name] = column;
    }
    return result;
}
exports.toColumnCollection = toColumnCollection;
//# sourceMappingURL=column-collection.js.map