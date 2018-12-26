"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../../../join");
const join_ck_1 = require("./join-ck");
function innerJoinCk(fromTable, toTable, fromDelegate, toDelegate) {
    return join_ck_1.joinCk(fromTable, toTable, fromDelegate, toDelegate, false, join_1.JoinType.INNER);
}
exports.innerJoinCk = innerJoinCk;
//# sourceMappingURL=inner.js.map