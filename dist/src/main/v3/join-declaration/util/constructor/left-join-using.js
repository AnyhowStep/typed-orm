"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_delegate_1 = require("./join-using-delegate");
const join_1 = require("../../../join");
function leftJoinUsing(fromTable, toTable, usingDelegate) {
    return join_using_delegate_1.invokeJoinUsingDelegate(fromTable, toTable, usingDelegate, true, join_1.JoinType.LEFT);
}
exports.leftJoinUsing = leftJoinUsing;
//# sourceMappingURL=left-join-using.js.map