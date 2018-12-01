"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_identifier_1 = require("./column-identifier");
;
var ColumnIdentifierMapUtil;
(function (ColumnIdentifierMapUtil) {
    function isSubset(a, b) {
        for (let columnNameA in a) {
            const columnA = a[columnNameA];
            const columnB = b[columnNameA];
            if (columnB == undefined) {
                return false;
            }
            if (!column_identifier_1.ColumnIdentifierUtil.isEqual(columnA, columnB)) {
                return false;
            }
        }
        return true;
    }
    ColumnIdentifierMapUtil.isSubset = isSubset;
    /*
        Cannot actually check `assertDelegate` are equal.
        TODO Refactor this to ColumnIdentifierMap.assertIsEqual()
    */
    function assertIsSubset(a, b) {
        for (let columnNameA in a) {
            const columnA = a[columnNameA];
            const columnB = b[columnNameA];
            if (columnB == undefined) {
                throw new Error(`Column ${columnNameA} is not allowed`);
            }
            column_identifier_1.ColumnIdentifierUtil.assertIsEqual(columnA, columnB);
        }
    }
    ColumnIdentifierMapUtil.assertIsSubset = assertIsSubset;
})(ColumnIdentifierMapUtil = exports.ColumnIdentifierMapUtil || (exports.ColumnIdentifierMapUtil = {}));
//# sourceMappingURL=column-identifier-map.js.map