"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_delegate_1 = require("./join-using-delegate");
const left_join_1 = require("./left-join");
function leftJoinUsing(query, aliasedTable, usingDelegate) {
    const using = join_using_delegate_1.invokeJoinUsingDelegate(query, aliasedTable, usingDelegate);
    return left_join_1.leftJoin(query, aliasedTable, (() => using), () => using.map(c => aliasedTable.columns[c.name]));
}
exports.leftJoinUsing = leftJoinUsing;
//# sourceMappingURL=left-join-using.js.map