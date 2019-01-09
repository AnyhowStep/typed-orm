"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../../column");
const from_select_item_1 = require("./from-select-item");
//Assumes no duplicate columnName in SelectsT
function fromSelectItemArray(selects, tableAlias) {
    const result = {};
    for (let item of selects) {
        const map = from_select_item_1.fromSelectItem(item);
        for (let columnName in map) {
            //HACK A hack to undo other hacks...
            result[columnName] = column_1.ColumnUtil.setIsFromExprSelectItem(column_1.ColumnUtil.withTableAlias(map[columnName], tableAlias), false);
        }
    }
    return result;
}
exports.fromSelectItemArray = fromSelectItemArray;
//# sourceMappingURL=from-select-item-array.js.map