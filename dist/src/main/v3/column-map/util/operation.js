"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("../../column");
function withTableAlias(columnMap, newTableAlias) {
    const result = {};
    for (let columnName in columnMap) {
        result[columnName] = column_1.ColumnUtil.withTableAlias(columnMap[columnName], newTableAlias);
    }
    return result;
}
exports.withTableAlias = withTableAlias;
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
            }, columnA.__subTableName, columnA.__isInSelectClause);
        }
        else {
            result[columnName] = columnA;
        }
    }
    return result;
}
exports.leftIntersect = leftIntersect;
;
function intersect(columnMapA, columnMapB) {
    const left = leftIntersect(columnMapA, columnMapB);
    const right = {};
    for (let columnName in columnMapB) {
        if (columnMapA.hasOwnProperty(columnName)) {
            continue;
        }
        right[columnName] = columnMapB[columnName];
    }
    return {
        ...left,
        ...right,
    };
}
exports.intersect = intersect;
function toNullable(columnMap) {
    const result = {};
    for (let columnName in columnMap) {
        result[columnName] = column_1.ColumnUtil.toNullable(columnMap[columnName]);
    }
    return result;
}
exports.toNullable = toNullable;
//# sourceMappingURL=operation.js.map