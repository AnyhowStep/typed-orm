"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("./column");
const expr_select_item_1 = require("./expr-select-item");
var SelectItemUtil;
(function (SelectItemUtil) {
    function isSingleValueSelectItem(raw) {
        return (column_1.Column.isColumn(raw) ||
            expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(raw));
    }
    SelectItemUtil.isSingleValueSelectItem = isSingleValueSelectItem;
})(SelectItemUtil = exports.SelectItemUtil || (exports.SelectItemUtil = {}));
//# sourceMappingURL=select-item.js.map