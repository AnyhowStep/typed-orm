"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("../../../column");
function leftIntersect(columnMapA, columnMapB) {
    const result = {};
    for (let columnName in columnMapA) {
        const columnA = columnMapA[columnName];
        const columnB = columnMapB[columnName];
        if (column_1.ColumnUtil.isColumn(columnB)) {
            result[columnName] = new column_1.Column({
                tableAlias: columnA.tableAlias,
                name: columnA.name,
                assertDelegate: sd.and(columnA.assertDelegate, columnMapB[columnName].assertDelegate),
            }, columnA.__isFromExprSelectItem);
        }
        else {
            result[columnName] = columnA;
        }
    }
    return result;
}
exports.leftIntersect = leftIntersect;
;
//# sourceMappingURL=left-intersect.js.map