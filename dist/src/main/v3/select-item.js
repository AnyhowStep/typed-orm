"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("./column");
const column_map_1 = require("./column-map");
const expr_select_item_1 = require("./expr-select-item");
var SelectItemUtil;
(function (SelectItemUtil) {
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
            return column_map_1.ColumnMapUtil.isColumnMap(raw);
        }
    }
    SelectItemUtil.isSelectItem = isSelectItem;
})(SelectItemUtil = exports.SelectItemUtil || (exports.SelectItemUtil = {}));
//# sourceMappingURL=select-item.js.map