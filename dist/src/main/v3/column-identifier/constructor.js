"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromColumn(column) {
    const result = {
        tableAlias: column.tableAlias,
        name: column.name,
    };
    return result;
}
exports.fromColumn = fromColumn;
function fromExprSelectItem(exprSelectItem) {
    const result = {
        tableAlias: exprSelectItem.tableAlias,
        name: exprSelectItem.alias,
    };
    return result;
}
exports.fromExprSelectItem = fromExprSelectItem;
//# sourceMappingURL=constructor.js.map