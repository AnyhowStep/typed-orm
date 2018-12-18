"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const operation_1 = require("./operation");
const predicate_1 = require("./predicate");
const column_1 = require("../../column");
const expr_select_item_1 = require("../../expr-select-item");
const column_ref_1 = require("../../column-ref");
function fromFieldArray(tableAlias, fields) {
    const result = {};
    for (let field of fields) {
        result[field.name] = new column_1.Column({
            tableAlias: tableAlias,
            name: field.name,
            assertDelegate: field.assertDelegate,
        });
    }
    return result;
}
exports.fromFieldArray = fromFieldArray;
function fromAssertMap(tableAlias, assertMap) {
    const result = {};
    for (let columnName in assertMap) {
        result[columnName] = new column_1.Column({
            tableAlias: tableAlias,
            name: columnName,
            assertDelegate: sd.toAssertDelegate(assertMap[columnName]),
        });
    }
    return result;
}
exports.fromAssertMap = fromAssertMap;
function fromJoin(join) {
    if (join.nullable) {
        return operation_1.toNullable(join.columns);
    }
    else {
        return join.columns;
    }
}
exports.fromJoin = fromJoin;
function fromColumn(column) {
    return {
        [column.name]: column
    };
}
exports.fromColumn = fromColumn;
function fromSingleValueSelectItem(selectItem) {
    return fromColumn(column_1.ColumnUtil.fromSingleValueSelectItem(selectItem));
}
exports.fromSingleValueSelectItem = fromSingleValueSelectItem;
//Assumes no duplicate columnName in SelectsT
function fromSelectItem(selectItem) {
    if (column_1.ColumnUtil.isColumn(selectItem)) {
        return fromColumn(selectItem);
    }
    else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(selectItem)) {
        return fromSingleValueSelectItem(selectItem);
    }
    else if (predicate_1.isColumnMap(selectItem)) {
        return selectItem;
    }
    else if (column_ref_1.ColumnRefUtil.isColumnRef(selectItem)) {
        const result = {};
        for (let tableAlias in selectItem) {
            const columnMap = selectItem[tableAlias];
            for (let columnName in columnMap) {
                const column = columnMap[columnName];
                result[column.name] = column;
            }
        }
        return result;
    }
    else {
        throw new Error(`Unknown select item`);
    }
}
exports.fromSelectItem = fromSelectItem;
//Assumes no duplicate columnName in SelectsT
function fromSelectItemArray(selects) {
    const columnMaps = selects.map((selectItem) => {
        return fromSelectItem(selectItem);
    });
    return Object.assign({}, ...columnMaps);
}
exports.fromSelectItemArray = fromSelectItemArray;
function fromColumnArray(columns) {
    const result = {};
    for (let column of columns) {
        result[column.name] = column;
    }
    return result;
}
exports.fromColumnArray = fromColumnArray;
//# sourceMappingURL=constructor.js.map