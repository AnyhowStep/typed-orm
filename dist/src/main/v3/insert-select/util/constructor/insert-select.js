"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_select_1 = require("../../insert-select");
const table_1 = require("../../../table");
const column_ref_1 = require("../../../column-ref");
function insertSelect(query, modifier, table, delegate) {
    const ref = column_ref_1.ColumnRefUtil.fromSelectItemArray(query._selects);
    const row = delegate(column_ref_1.ColumnRefUtil.toConvenient(ref));
    for (let columnName of table_1.TableUtil.requiredColumnNames(table)) {
        if (!(columnName in row)) {
            throw new Error(`A value for ${table.alias}.${columnName} is required`);
        }
    }
    return new insert_select_1.InsertSelect({
        _query: query,
        _table: table,
        _row: row,
        _modifier: modifier,
    });
}
exports.insertSelect = insertSelect;
//# sourceMappingURL=insert-select.js.map