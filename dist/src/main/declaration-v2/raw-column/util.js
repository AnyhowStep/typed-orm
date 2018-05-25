"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("../column");
var RawColumnUtil;
(function (RawColumnUtil) {
    function isColumn(rawColumn) {
        return rawColumn instanceof column_1.Column;
    }
    RawColumnUtil.isColumn = isColumn;
    function isAssertFunc(rawColumn) {
        return !(rawColumn instanceof column_1.Column);
    }
    RawColumnUtil.isAssertFunc = isAssertFunc;
    function toColumn(tableAlias, name, rawColumn) {
        if (isColumn(rawColumn)) {
            if (tableAlias == rawColumn.tableAlias && name == rawColumn.name) {
                return rawColumn;
            }
            else {
                return new column_1.Column(tableAlias, name, rawColumn.assertDelegate);
            }
        }
        else if (isAssertFunc(rawColumn)) {
            return new column_1.Column(tableAlias, name, sd.toAssertDelegateExact(rawColumn));
        }
        else {
            throw new Error(`Unknown raw column ${typeof rawColumn}`);
        }
    }
    RawColumnUtil.toColumn = toColumn;
})(RawColumnUtil = exports.RawColumnUtil || (exports.RawColumnUtil = {}));
//# sourceMappingURL=util.js.map