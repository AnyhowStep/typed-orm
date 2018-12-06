"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_delegate_1 = require("./join-using-delegate");
const right_join_1 = require("./right-join");
function rightJoinUsing(query, aliasedTable, usingDelegate) {
    const using = join_using_delegate_1.invokeJoinUsingDelegate(query, aliasedTable, usingDelegate);
    return right_join_1.rightJoin(query, aliasedTable, (() => using), () => using.map(c => aliasedTable.columns[c.name]));
}
exports.rightJoinUsing = rightJoinUsing;
//# sourceMappingURL=right-join-using.js.map