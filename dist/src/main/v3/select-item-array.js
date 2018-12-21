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
    function assertNoDuplicateColumnName(arr) {
        const seen = [];
        for (let item of arr) {
            for (let name of select_item_1.SelectItemUtil.getColumnNames(item)) {
                if (seen.indexOf(name) >= 0) {
                    throw new Error(`Duplicate column name '${name}' found`);
                }
                seen.push(name);
            }
        }
    }
    SelectItemArrayUtil.assertNoDuplicateColumnName = assertNoDuplicateColumnName;
})(SelectItemArrayUtil = exports.SelectItemArrayUtil || (exports.SelectItemArrayUtil = {}));
//# sourceMappingURL=select-item-array.js.map