"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../predicate");
const column_ref_1 = require("../../../column-ref");
const column_1 = require("../../../column");
const column_map_1 = require("../../../column-map");
function joinUsingColumns(columns, aliasedTable) {
    //During run-time, we cannot actually check if the assertDelegate
    //of a column matches...
    return columns.filter(column => {
        return aliasedTable.columns[column.name] != undefined;
    });
}
exports.joinUsingColumns = joinUsingColumns;
function invokeJoinUsingDelegate(query, aliasedTable, usingDelegate) {
    if (query._joins == undefined) {
        throw new Error(`Cannot JOIN before FROM clause`);
    }
    predicate_1.assertValidJoinTarget(query, aliasedTable);
    const usingColumns = joinUsingColumns(column_1.ColumnUtil.Array.fromJoinArray(query._joins), aliasedTable);
    const using = usingDelegate((query._joins.length == 1 ?
        column_map_1.ColumnMapUtil.fromColumnArray(usingColumns) :
        column_ref_1.ColumnRefUtil.fromColumnArray(usingColumns)));
    column_1.ColumnUtil.Array.assertIsColumnArray(using);
    return using;
}
exports.invokeJoinUsingDelegate = invokeJoinUsingDelegate;
//# sourceMappingURL=join-using-delegate.js.map