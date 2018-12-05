"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_delegate_1 = require("./join-using-delegate");
const left_join_1 = require("./left-join");
const column_1 = require("../../../column");
const column_ref_1 = require("../../../column-ref");
function leftJoinUsing(query, aliasedTable, usingDelegate) {
    const usingRef = column_ref_1.ColumnRefUtil.fromColumnArray(join_using_delegate_1.joinUsingColumns(column_1.ColumnUtil.Array.fromJoinArray(query.joins), aliasedTable));
    const using = usingDelegate(column_ref_1.ColumnRefUtil.toConvenient(usingRef));
    return left_join_1.leftJoin(query, aliasedTable, (() => using), () => using.map(c => aliasedTable.columns[c.name]));
}
exports.leftJoinUsing = leftJoinUsing;
//# sourceMappingURL=left-join-using.js.map