"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_delegate_1 = require("./join-using-delegate");
const inner_join_1 = require("./inner-join");
const column_1 = require("../../../column");
const column_ref_1 = require("../../../column-ref");
function innerJoinUsing(query, aliasedTable, usingDelegate) {
    const usingRef = column_ref_1.ColumnRefUtil.fromColumnArray(join_using_delegate_1.joinUsingColumns(column_1.ColumnUtil.Array.fromJoinArray(query.joins), aliasedTable));
    const using = usingDelegate(column_ref_1.ColumnRefUtil.toConvenient(usingRef));
    return inner_join_1.innerJoin(query, aliasedTable, (() => using), () => using.map(c => aliasedTable.columns[c.name]));
}
exports.innerJoinUsing = innerJoinUsing;
//# sourceMappingURL=inner-join-using.js.map