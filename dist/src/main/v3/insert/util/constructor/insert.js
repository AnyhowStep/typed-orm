"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_1 = require("../../insert");
function insert(table) {
    return new insert_1.Insert({
        _table: table,
        _values: undefined,
        _modifier: undefined,
    });
}
exports.insert = insert;
//# sourceMappingURL=insert.js.map