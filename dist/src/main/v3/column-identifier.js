"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("./column");
const column_map_1 = require("./column-map");
const expr_select_item_1 = require("./expr-select-item");
var ColumnIdentifierUtil;
(function (ColumnIdentifierUtil) {
    function fromColumn(column) {
        const result = {
            tableAlias: column.tableAlias,
            name: column.name,
        };
        return result;
    }
    ColumnIdentifierUtil.fromColumn = fromColumn;
    function fromExprSelectItem(exprSelectItem) {
        const result = {
            tableAlias: exprSelectItem.tableAlias,
            name: exprSelectItem.alias,
        };
        return result;
    }
    ColumnIdentifierUtil.fromExprSelectItem = fromExprSelectItem;
    function fromColumnMap(columnMap) {
        const result = [];
        for (let columnName in columnMap) {
            result.push(fromColumn(columnMap[columnName]));
        }
        return result;
    }
    ColumnIdentifierUtil.fromColumnMap = fromColumnMap;
    function fromSelectItem(selectItem) {
        if (column_1.Column.isColumn(selectItem)) {
            return [fromColumn(selectItem)];
        }
        else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            return [fromExprSelectItem(selectItem)];
        }
        else if (column_map_1.ColumnMapUtil.isColumnMap(selectItem)) {
            return fromColumnMap(selectItem);
        }
        else {
            throw new Error(`Unknown select item`);
        }
    }
    ColumnIdentifierUtil.fromSelectItem = fromSelectItem;
    function isEqual(a, b) {
        return (a.tableAlias == b.tableAlias &&
            a.name == b.name);
    }
    ColumnIdentifierUtil.isEqual = isEqual;
    function assertIsEqual(a, b) {
        if (a.tableAlias != b.tableAlias) {
            throw new Error(`Table alias mismatch ${a.tableAlias} != ${b.tableAlias}`);
        }
        if (a.name != b.name) {
            throw new Error(`Name mismatch ${a.name} != ${b.name}`);
        }
    }
    ColumnIdentifierUtil.assertIsEqual = assertIsEqual;
})(ColumnIdentifierUtil = exports.ColumnIdentifierUtil || (exports.ColumnIdentifierUtil = {}));
//# sourceMappingURL=column-identifier.js.map