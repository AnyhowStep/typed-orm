"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../predicate");
const column_1 = require("../../../column");
const expr_select_item_1 = require("../../../expr-select-item");
const column_ref_1 = require("../../../column-ref");
const from_column_1 = require("./from-column");
const from_single_value_select_item_1 = require("./from-single-value-select-item");
//Assumes no duplicate columnName in SelectsT
function fromSelectItem(selectItem) {
    if (column_1.ColumnUtil.isColumn(selectItem)) {
        return from_column_1.fromColumn(selectItem);
    }
    else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(selectItem)) {
        return from_single_value_select_item_1.fromSingleValueSelectItem(selectItem);
    }
    else if (predicate_1.isColumnMap(selectItem)) {
        return selectItem;
    }
    else if (column_ref_1.ColumnRefUtil.isColumnRef(selectItem)) {
        const result = {};
        for (let tableAlias in selectItem) {
            const columnMap = selectItem[tableAlias];
            for (let columnName in columnMap) {
                const column = columnMap[columnName];
                result[column.name] = column;
            }
        }
        return result;
    }
    else {
        throw new Error(`Unknown select item`);
    }
}
exports.fromSelectItem = fromSelectItem;
//# sourceMappingURL=from-select-item.js.map