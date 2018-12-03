"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    TODO Debate data type conversion utils naming convention.
    + ToXxx vs. FromXxx

    Using ToXxx seems to apply to more cases.
    Example,

    ColumnMapUtil.ToColumnIdentifierUnion<>
    vs.
    ColumnIdentifierUtil.UnionFromColumnMap<>

    ColumnMapUtil.ToColumnIdentifierArray<>
    vs.
    ColumnIdentifierArrayUtil.FromColumnMap<>
*/
const sd = require("schema-decorator");
const column_1 = require("../column");
const expr_select_item_1 = require("../expr-select-item");
;
var ColumnMapUtil;
(function (ColumnMapUtil) {
    function isColumnMap(raw) {
        if (!(raw instanceof Object)) {
            return false;
        }
        for (let columnName in raw) {
            const column = raw[columnName];
            if (!column_1.Column.isColumn(column)) {
                return false;
            }
        }
        return true;
    }
    ColumnMapUtil.isColumnMap = isColumnMap;
    function hasOneColumn(columnMap) {
        return (Object.keys(columnMap).length == 1);
    }
    ColumnMapUtil.hasOneColumn = hasOneColumn;
    function withTableAlias(columnMap, newTableAlias) {
        return Object.keys(columnMap)
            .reduce((memo, columnName) => {
            memo[columnName] = column_1.Column.withTableAlias(columnMap[columnName], newTableAlias);
            return memo;
        }, {});
    }
    ColumnMapUtil.withTableAlias = withTableAlias;
    function hasColumnIdentifier(columnMap, columnIdentifier) {
        if (!columnMap.hasOwnProperty(columnIdentifier.name)) {
            return false;
        }
        const column = columnMap[columnIdentifier.name];
        return (column.tableAlias == columnIdentifier.tableAlias &&
            column.name == columnIdentifier.name);
    }
    ColumnMapUtil.hasColumnIdentifier = hasColumnIdentifier;
    function assertHasColumnIdentifier(columnMap, columnIdentifier) {
        if (!hasColumnIdentifier(columnMap, columnIdentifier)) {
            throw new Error(`Column ${columnIdentifier.tableAlias}.${columnIdentifier.name} does not exist in column map`);
        }
    }
    ColumnMapUtil.assertHasColumnIdentifier = assertHasColumnIdentifier;
    function assertHasColumnIdentifiers(columnMap, columnIdentifiers) {
        for (let columnIdentifier of columnIdentifiers) {
            assertHasColumnIdentifier(columnMap, columnIdentifier);
        }
    }
    ColumnMapUtil.assertHasColumnIdentifiers = assertHasColumnIdentifiers;
    function fromFieldArray(tableAlias, fields) {
        return fields.reduce((memo, field) => {
            const columnName = field.name;
            const column = new column_1.Column({
                tableAlias: tableAlias,
                name: columnName,
                assertDelegate: field.assertDelegate,
            });
            memo[columnName] = column;
            return memo;
        }, {});
    }
    ColumnMapUtil.fromFieldArray = fromFieldArray;
    function fromAssertMap(tableAlias, assertMap) {
        const columnNames = Object.keys(assertMap);
        return columnNames.reduce((memo, columnName) => {
            memo[columnName] = new column_1.Column({
                tableAlias: tableAlias,
                name: columnName,
                assertDelegate: sd.toAssertDelegate(assertMap[columnName]),
            });
            return memo;
        }, {});
    }
    ColumnMapUtil.fromAssertMap = fromAssertMap;
    function leftIntersect(columnMapA, columnMapB) {
        const columnMapANames = Object.keys(columnMapA);
        return columnMapANames.reduce((memo, columnName) => {
            const columnA = columnMapA[columnName];
            if (columnMapB.hasOwnProperty(columnName)) {
                memo[columnName] = new column_1.Column({
                    tableAlias: columnA.tableAlias,
                    name: columnA.name,
                    assertDelegate: sd.and(columnA.assertDelegate, columnMapB[columnName].assertDelegate),
                }, columnA.__subTableName, columnA.__isInSelectClause);
            }
            else {
                memo[columnName] = columnA;
            }
            return memo;
        }, {});
    }
    ColumnMapUtil.leftIntersect = leftIntersect;
    ;
    function intersect(columnMapA, columnMapB) {
        const left = leftIntersect(columnMapA, columnMapB);
        const columnNames = Object.keys(columnMapB)
            .filter(columnName => !columnMapA.hasOwnProperty(columnName));
        const right = columnNames.reduce((memo, columnName) => {
            memo[columnName] = columnMapB[columnName];
            return memo;
        }, {});
        return Object.assign({}, left, right);
    }
    ColumnMapUtil.intersect = intersect;
    function toNullable(columnMap) {
        return Object.keys(columnMap).reduce((memo, columnName) => {
            memo[columnName] = column_1.Column.toNullable(columnMap[columnName]);
            return memo;
        }, {});
    }
    ColumnMapUtil.toNullable = toNullable;
    function fromJoin(join) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns = join.columns;
        if (join.nullable) {
            const result = toNullable(columns);
            return result;
        }
        else {
            return columns;
        }
    }
    ColumnMapUtil.fromJoin = fromJoin;
    function fromColumn(column) {
        return {
            [column.name]: column
        };
    }
    ColumnMapUtil.fromColumn = fromColumn;
    function fromSingleValueSelectItem(selectItem) {
        return fromColumn(column_1.Column.fromSingleValueSelectItem(selectItem));
    }
    ColumnMapUtil.fromSingleValueSelectItem = fromSingleValueSelectItem;
    function fromSelectItem(selectItem) {
        if (column_1.Column.isColumn(selectItem)) {
            return fromColumn(selectItem);
        }
        else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            return fromSingleValueSelectItem(selectItem);
        }
        else if (isColumnMap(selectItem)) {
            return selectItem;
        }
        else {
            throw new Error(`Unknown select item`);
        }
    }
    ColumnMapUtil.fromSelectItem = fromSelectItem;
    //Assumes no duplicate columnName in SelectsT
    function fromSelectItemArray(selects) {
        const columnMaps = selects.map((selectItem) => {
            return fromSelectItem(selectItem);
        });
        return Object.assign({}, ...columnMaps);
    }
    ColumnMapUtil.fromSelectItemArray = fromSelectItemArray;
})(ColumnMapUtil = exports.ColumnMapUtil || (exports.ColumnMapUtil = {}));
//# sourceMappingURL=column-map.js.map