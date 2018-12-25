"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_one_using_delegate_1 = require("./join-one-using-delegate");
const join_1 = require("../../../join");
function innerJoinOneUsing(fromTable, toTable, usingDelegate) {
    return join_one_using_delegate_1.invokeJoinOneUsing(fromTable, toTable, usingDelegate, false, join_1.JoinType.INNER);
}
exports.innerJoinOneUsing = innerJoinOneUsing;
//# sourceMappingURL=inner-join-one-using.js.map