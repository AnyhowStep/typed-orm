"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_select_item_1 = require("./from-select-item");
function fromSelectItemArray(arr) {
    const result = [];
    for (let item of arr) {
        result.push(...from_select_item_1.fromSelectItem(item));
    }
    return result;
}
exports.fromSelectItemArray = fromSelectItemArray;
//# sourceMappingURL=from-select-item-array.js.map