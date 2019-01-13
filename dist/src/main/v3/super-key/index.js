"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_map_1 = require("../column-map");
var SuperKeyUtil;
(function (SuperKeyUtil) {
    function assertDelegate(table) {
        return sd.or(...table.candidateKeys.map((candidateKey) => {
            return sd.intersect(column_map_1.ColumnMapUtil.assertDelegate(column_map_1.ColumnMapUtil.pick(table.columns, candidateKey)), column_map_1.ColumnMapUtil.partialAssertDelegate(column_map_1.ColumnMapUtil.omit(table.columns, candidateKey)));
        }));
    }
    SuperKeyUtil.assertDelegate = assertDelegate;
})(SuperKeyUtil = exports.SuperKeyUtil || (exports.SuperKeyUtil = {}));
//# sourceMappingURL=index.js.map