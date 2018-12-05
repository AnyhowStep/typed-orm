"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_delegate_1 = require("./join-using-delegate");
const inner_join_1 = require("./inner-join");
function innerJoinUsing(query, aliasedTable, usingDelegate) {
    const using = join_using_delegate_1.invokeJoinUsingDelegate(query, aliasedTable, usingDelegate);
    return inner_join_1.innerJoin(query, aliasedTable, (() => using), () => using.map(c => aliasedTable.columns[c.name]));
}
exports.innerJoinUsing = innerJoinUsing;
//# sourceMappingURL=inner-join-using.js.map