"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../join");
const join_using_1 = require("./join-using");
const join_2 = require("../../../../join");
function rightJoinUsing(query, aliasedTable, usingDelegate) {
    const { _joins } = join_using_1.joinUsing(query, aliasedTable, usingDelegate, false, join_2.JoinType.RIGHT);
    //Pretty sure the last join is the one right join we just
    //added
    const lastJoin = _joins[_joins.length - 1];
    return join_1.rightJoin(query, aliasedTable, () => lastJoin.from, () => lastJoin.to);
}
exports.rightJoinUsing = rightJoinUsing;
//# sourceMappingURL=right.js.map