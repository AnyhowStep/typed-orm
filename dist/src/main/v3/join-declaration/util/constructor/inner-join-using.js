"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_delegate_1 = require("./join-using-delegate");
const join_1 = require("../../../join");
function innerJoinUsing(fromTable, toTable, usingDelegate) {
    return join_using_delegate_1.invokeJoinUsingDelegate(fromTable, toTable, usingDelegate, false, join_1.JoinType.INNER);
}
exports.innerJoinUsing = innerJoinUsing;
//# sourceMappingURL=inner-join-using.js.map