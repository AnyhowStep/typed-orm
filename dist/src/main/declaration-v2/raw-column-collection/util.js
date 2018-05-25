"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_column_1 = require("../raw-column");
var RawColumnCollectionUtil;
(function (RawColumnCollectionUtil) {
    function toColumnCollection(tableAlias, rawColumnCollection) {
        const result = {};
        for (let columnName in rawColumnCollection) {
            if (!rawColumnCollection.hasOwnProperty(columnName)) {
                continue;
            }
            const rawColumn = rawColumnCollection[columnName];
            const column = raw_column_1.RawColumnUtil.toColumn(tableAlias, columnName, rawColumn);
            result[columnName] = column;
        }
        return result;
    }
    RawColumnCollectionUtil.toColumnCollection = toColumnCollection;
})(RawColumnCollectionUtil = exports.RawColumnCollectionUtil || (exports.RawColumnCollectionUtil = {}));
//# sourceMappingURL=util.js.map