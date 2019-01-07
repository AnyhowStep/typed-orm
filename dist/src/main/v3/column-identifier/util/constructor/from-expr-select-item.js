"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromExprSelectItem(exprSelectItem) {
    const result = {
        tableAlias: exprSelectItem.tableAlias,
        name: exprSelectItem.alias,
    };
    return result;
}
exports.fromExprSelectItem = fromExprSelectItem;
//# sourceMappingURL=from-expr-select-item.js.map