"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_ck_using_1 = require("./join-ck-using");
const join_1 = require("../join");
const join_2 = require("../../../../join");
function rightJoinCkUsing(query, table, usingDelegate) {
    const { _joins } = join_ck_using_1.joinCkUsing(query, table, usingDelegate, false, join_2.JoinType.RIGHT);
    //Pretty sure the last join is the one right join we just
    //added
    const lastJoin = _joins[_joins.length - 1];
    const result = join_1.rightJoin(query, table, () => lastJoin.from, () => lastJoin.to);
    return result;
}
exports.rightJoinCkUsing = rightJoinCkUsing;
//# sourceMappingURL=right.js.map