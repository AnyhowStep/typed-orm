"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../../join");
const join_delegate_1 = require("./join-delegate");
function leftJoin(fromTable, toTable, fromDelegate, toDelegate) {
    return join_delegate_1.invokeJoinDelegate(fromTable, toTable, fromDelegate, toDelegate, true, join_1.JoinType.LEFT);
}
exports.leftJoin = leftJoin;
//# sourceMappingURL=left-join.js.map