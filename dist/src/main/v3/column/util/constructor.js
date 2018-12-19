"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../column");
const predicate_1 = require("./predicate");
const expr_select_item_1 = require("../../expr-select-item");
//TODO Find some way to not need this hack
function fromExprSelectItem(item) {
    return new column_1.Column({
        tableAlias: item.tableAlias,
        name: item.alias,
        assertDelegate: item.assertDelegate,
    }, undefined, 
    //TODO Find some way to not need this hack
    true);
}
exports.fromExprSelectItem = fromExprSelectItem;
function fromSingleValueSelectItem(item) {
    if (predicate_1.isColumn(item)) {
        return new column_1.Column(item);
    }
    else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(item)) {
        return fromExprSelectItem(item);
    }
    else {
        throw new Error(`Unknown SingleValueSelectItem`);
    }
}
exports.fromSingleValueSelectItem = fromSingleValueSelectItem;
//# sourceMappingURL=constructor.js.map