"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_map_1 = require("../column-map");
var PrimaryKeyUtil;
(function (PrimaryKeyUtil) {
    function assertDelegate(table) {
        return column_map_1.ColumnMapUtil.assertDelegate(column_map_1.ColumnMapUtil.pick(table.columns, table.primaryKey));
    }
    PrimaryKeyUtil.assertDelegate = assertDelegate;
})(PrimaryKeyUtil = exports.PrimaryKeyUtil || (exports.PrimaryKeyUtil = {}));
//# sourceMappingURL=index.js.map