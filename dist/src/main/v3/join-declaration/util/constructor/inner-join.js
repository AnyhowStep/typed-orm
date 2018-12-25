"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../../join");
const join_delegate_1 = require("./join-delegate");
function innerJoin(fromTable, toTable, fromDelegate, toDelegate) {
    return join_delegate_1.invokeJoinDelegate(fromTable, toTable, fromDelegate, toDelegate, false, join_1.JoinType.INNER);
}
exports.innerJoin = innerJoin;
//# sourceMappingURL=inner-join.js.map