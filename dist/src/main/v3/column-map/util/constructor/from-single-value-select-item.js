"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../../column");
const from_column_1 = require("./from-column");
function fromSingleValueSelectItem(selectItem) {
    return from_column_1.fromColumn(column_1.ColumnUtil.fromSingleValueSelectItem(selectItem));
}
exports.fromSingleValueSelectItem = fromSingleValueSelectItem;
//# sourceMappingURL=from-single-value-select-item.js.map