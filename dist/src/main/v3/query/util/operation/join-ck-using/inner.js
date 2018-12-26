"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_ck_using_1 = require("./join-ck-using");
const join_1 = require("../../../../join");
function innerJoinCkUsing(query, table, usingDelegate) {
    return join_ck_using_1.joinCkUsing(query, table, usingDelegate, false, join_1.JoinType.INNER);
}
exports.innerJoinCkUsing = innerJoinCkUsing;
//# sourceMappingURL=inner.js.map