"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../column");
const predicate_1 = require("../predicate");
const expr_select_item_1 = require("../../../expr-select-item");
const from_expr_select_item_1 = require("./from-expr-select-item");
function fromSingleValueSelectItem(item) {
    if (predicate_1.isColumn(item)) {
        //TODO-DEBATE, shouldn't this copy __isSelectItem?
        return new column_1.Column(item);
    }
    else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(item)) {
        return from_expr_select_item_1.fromExprSelectItem(item);
    }
    else {
        throw new Error(`Unknown SingleValueSelectItem`);
    }
}
exports.fromSingleValueSelectItem = fromSingleValueSelectItem;
//# sourceMappingURL=from-single-value-select-item.js.map