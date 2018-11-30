"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
var AssertMapUtil;
(function (AssertMapUtil) {
    function nullableNames(assertMap) {
        const columnNames = Object.keys(assertMap);
        return columnNames.filter(columnName => sd.isNullable(assertMap[columnName]));
    }
    AssertMapUtil.nullableNames = nullableNames;
})(AssertMapUtil = exports.AssertMapUtil || (exports.AssertMapUtil = {}));
//# sourceMappingURL=assert-map.js.map