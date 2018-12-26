"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_pk_1 = require("./join-pk");
const join_1 = require("../join");
const join_2 = require("../../../../join");
function rightJoinPk(query, delegate, toTable) {
    const { _joins } = join_pk_1.joinPk(query, delegate, toTable, false, join_2.JoinType.RIGHT);
    //Pretty sure the last join is the one right join we just
    //added
    const lastJoin = _joins[_joins.length - 1];
    return join_1.rightJoin(query, toTable, () => lastJoin.from, () => lastJoin.to);
}
exports.rightJoinPk = rightJoinPk;
//# sourceMappingURL=right.js.map