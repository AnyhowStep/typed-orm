"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("./column");
const column_map_1 = require("./column-map");
const expr_select_item_1 = require("./expr-select-item");
const column_ref_1 = require("./column-ref");
var SelectItemUtil;
(function (SelectItemUtil) {
    function getColumnNames(item) {
        if (column_1.ColumnUtil.isColumn(item)) {
            return [item.name];
        }
        else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(item)) {
            return [item.alias];
        }
        else if (column_map_1.ColumnMapUtil.isColumnMap(item)) {
            return column_map_1.ColumnMapUtil.columnNames(item);
        }
        else if (column_ref_1.ColumnRefUtil.isColumnRef(item)) {
            return column_ref_1.ColumnRefUtil.columnNames(item);
        }
        else {
            throw new Error("Unknown select item");
        }
    }
    SelectItemUtil.getColumnNames = getColumnNames;
    function isSingleValueSelectItem(raw) {
        return (column_1.ColumnUtil.isColumn(raw) ||
            expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(raw));
    }
    SelectItemUtil.isSingleValueSelectItem = isSingleValueSelectItem;
    function isSelectItem(raw) {
        if (isSingleValueSelectItem(raw)) {
            return true;
        }
        else {
            return column_map_1.ColumnMapUtil.isColumnMap(raw) || column_ref_1.ColumnRefUtil.isColumnRef(raw);
        }
    }
    SelectItemUtil.isSelectItem = isSelectItem;
})(SelectItemUtil = exports.SelectItemUtil || (exports.SelectItemUtil = {}));
//# sourceMappingURL=select-item.js.map