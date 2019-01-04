"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exprLib = require("../../../expr-library");
function eqColumns(table, columns) {
    const arr = Object.keys(columns)
        .filter(columnName => ((columnName in table.columns) &&
        (columns[columnName] !== undefined)))
        .sort()
        .map(columnName => exprLib.nullSafeEq(table.columns[columnName], columns[columnName]));
    const condition = exprLib.and(...arr);
    return condition;
}
exports.eqColumns = eqColumns;
//# sourceMappingURL=eq-columns.js.map