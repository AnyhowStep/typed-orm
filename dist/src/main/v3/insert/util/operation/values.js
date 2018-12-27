"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_1 = require("../../insert");
function values(insert, ...values) {
    const { _table, _modifier, } = insert;
    return new insert_1.Insert({
        _table,
        _values: (insert._values == undefined) ?
            values :
            [...insert._values, ...values],
        _modifier,
    });
}
exports.values = values;
//# sourceMappingURL=values.js.map