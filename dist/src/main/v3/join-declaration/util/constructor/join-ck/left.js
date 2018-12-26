"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../../../join");
const join_ck_1 = require("./join-ck");
function leftJoinCk(fromTable, toTable, fromDelegate, toDelegate) {
    return join_ck_1.joinCk(fromTable, toTable, fromDelegate, toDelegate, true, join_1.JoinType.LEFT);
}
exports.leftJoinCk = leftJoinCk;
//# sourceMappingURL=left.js.map