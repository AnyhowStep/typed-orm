"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_1 = require("../../insert");
function replace(insert) {
    const { _table, _values, } = insert;
    return new insert_1.Insert({
        _table,
        _values,
        _modifier: insert_1.InsertModifier.REPLACE,
    });
}
exports.replace = replace;
//# sourceMappingURL=replace.js.map