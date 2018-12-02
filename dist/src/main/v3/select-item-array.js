"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const select_item_1 = require("./select-item");
var SelectItemArrayUtil;
(function (SelectItemArrayUtil) {
    function isSelectItemArray(raw) {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (!select_item_1.SelectItemUtil.isSelectItem(item)) {
                return false;
            }
        }
        return true;
    }
    SelectItemArrayUtil.isSelectItemArray = isSelectItemArray;
})(SelectItemArrayUtil = exports.SelectItemArrayUtil || (exports.SelectItemArrayUtil = {}));
//# sourceMappingURL=select-item-array.js.map