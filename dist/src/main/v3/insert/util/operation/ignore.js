"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_1 = require("../../insert");
function ignore(insert) {
    const { _table, _values, } = insert;
    return new insert_1.Insert({
        _table,
        _values,
        _modifier: insert_1.InsertModifier.IGNORE,
    });
}
exports.ignore = ignore;
//# sourceMappingURL=ignore.js.map