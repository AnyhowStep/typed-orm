"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_1 = require("../../insert");
function insertInto(table) {
    if (!table.insertAllowed) {
        throw new Error(`Cannot INSERT into table ${table.alias}`);
    }
    return new insert_1.Insert({
        _table: table,
        _values: undefined,
        _modifier: undefined,
    });
}
exports.insertInto = insertInto;
//# sourceMappingURL=insert-into.js.map