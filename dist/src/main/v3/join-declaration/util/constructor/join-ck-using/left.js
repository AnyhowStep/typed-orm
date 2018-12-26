"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_ck_using_1 = require("./join-ck-using");
const join_1 = require("../../../../join");
function leftJoinCkUsing(fromTable, toTable, usingDelegate) {
    return join_ck_using_1.joinCkUsing(fromTable, toTable, usingDelegate, true, join_1.JoinType.LEFT);
}
exports.leftJoinCkUsing = leftJoinCkUsing;
//# sourceMappingURL=left.js.map