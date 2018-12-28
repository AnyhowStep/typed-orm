"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../../column");
function columnNames(table) {
    return column_1.ColumnUtil.Name.Array.fromColumnMap(table.columns);
}
exports.columnNames = columnNames;
//# sourceMappingURL=column-names.js.map