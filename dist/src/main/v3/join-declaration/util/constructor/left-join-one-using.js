"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_one_using_delegate_1 = require("./join-one-using-delegate");
const join_1 = require("../../../join");
function leftJoinOneUsing(fromTable, toTable, usingDelegate) {
    return join_one_using_delegate_1.invokeJoinOneUsing(fromTable, toTable, usingDelegate, true, join_1.JoinType.LEFT);
}
exports.leftJoinOneUsing = leftJoinOneUsing;
//# sourceMappingURL=left-join-one-using.js.map