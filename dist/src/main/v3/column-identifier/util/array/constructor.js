"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ctor = require("../constructor");
const column_1 = require("../../../column");
const expr_select_item_1 = require("../../../expr-select-item");
const column_map_1 = require("../../../column-map");
function fromColumnMap(columnMap) {
    const result = [];
    for (let columnName in columnMap) {
        result.push(Ctor.fromColumn(columnMap[columnName]));
    }
    return result;
}
exports.fromColumnMap = fromColumnMap;
function fromSelectItem(selectItem) {
    if (column_1.ColumnUtil.isColumn(selectItem)) {
        return [Ctor.fromColumn(selectItem)];
    }
    else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(selectItem)) {
        return [Ctor.fromExprSelectItem(selectItem)];
    }
    else if (column_map_1.ColumnMapUtil.isColumnMap(selectItem)) {
        return fromColumnMap(selectItem);
    }
    else {
        throw new Error(`Unknown select item`);
    }
}
exports.fromSelectItem = fromSelectItem;
function fromSelectItemArray(arr) {
    const result = [];
    for (let item of arr) {
        result.push(...fromSelectItem(item));
    }
    return result;
}
exports.fromSelectItemArray = fromSelectItemArray;
function fromColumnRef(columnRef) {
    const result = [];
    for (let tableAlias in columnRef) {
        result.push(...fromColumnMap(columnRef[tableAlias]));
    }
    return result;
}
exports.fromColumnRef = fromColumnRef;
//# sourceMappingURL=constructor.js.map