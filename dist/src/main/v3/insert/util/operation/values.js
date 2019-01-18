"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_1 = require("../../insert");
const primitive_expr_1 = require("../../../primitive-expr");
function values(insert, ...values) {
    for (let i = 0; i < values.length; ++i) {
        const v = values[i];
        for (let columnName in v) {
            const column = insert._table.columns[columnName];
            if (column == undefined) {
                continue;
            }
            const rawValue = v[columnName];
            if (primitive_expr_1.PrimitiveExprUtil.isPrimitiveExpr(rawValue)) {
                column.assertDelegate(`${insert._table.alias}.values[${i}].${columnName}`, rawValue);
            }
        }
    }
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