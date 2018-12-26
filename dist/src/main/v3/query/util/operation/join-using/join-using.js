"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_ref_1 = require("../../../../column-ref");
const column_1 = require("../../../../column");
const column_map_1 = require("../../../../column-map");
const join_1 = require("../join");
function joinUsingColumns(columns, aliasedTable) {
    //During run-time, we cannot actually check if the assertDelegate
    //of a column matches...
    return columns.filter(column => {
        return aliasedTable.columns[column.name] != undefined;
    });
}
exports.joinUsingColumns = joinUsingColumns;
function joinUsing(query, aliasedTable, usingDelegate, nullable, joinType) {
    const usingColumns = joinUsingColumns(column_1.ColumnUtil.Array.fromJoinArray(query._joins), aliasedTable);
    const using = usingDelegate((query._joins.length == 1 ?
        column_map_1.ColumnMapUtil.fromColumnArray(usingColumns) :
        column_ref_1.ColumnRefUtil.fromColumnArray(usingColumns)));
    return join_1.join(query, aliasedTable, () => using, () => using.map(c => aliasedTable.columns[c.name]), nullable, joinType);
}
exports.joinUsing = joinUsing;
//# sourceMappingURL=join-using.js.map