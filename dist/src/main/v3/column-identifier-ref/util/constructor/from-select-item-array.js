"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_select_item_1 = require("./from-select-item");
function appendSelectItemArray(ref, arr) {
    for (let item of arr) {
        from_select_item_1.appendSelectItem(ref, item);
    }
    return ref;
}
exports.appendSelectItemArray = appendSelectItemArray;
function fromSelectItemArray(arr) {
    const result = {};
    appendSelectItemArray(result, arr);
    return result;
}
exports.fromSelectItemArray = fromSelectItemArray;
//# sourceMappingURL=from-select-item-array.js.map