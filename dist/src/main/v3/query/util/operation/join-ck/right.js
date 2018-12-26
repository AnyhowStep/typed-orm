"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../../../join");
const join_2 = require("../join");
const join_ck_1 = require("./join-ck");
function rightJoinCk(query, table, fromDelegate, toDelegate) {
    const { _joins } = join_ck_1.joinCk(query, table, fromDelegate, toDelegate, false, join_1.JoinType.RIGHT);
    //Pretty sure the last join is the one right join we just
    //added
    const lastJoin = _joins[_joins.length - 1];
    const result = join_2.rightJoin(query, table, () => lastJoin.from, () => lastJoin.to);
    return result;
}
exports.rightJoinCk = rightJoinCk;
//# sourceMappingURL=right.js.map