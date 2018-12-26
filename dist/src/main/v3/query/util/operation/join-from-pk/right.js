"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_from_pk_1 = require("./join-from-pk");
const join_1 = require("../join");
const join_2 = require("../../../../join");
function rightJoinFromPk(query, delegate, toTable) {
    const { _joins } = join_from_pk_1.joinFromPk(query, delegate, toTable, false, join_2.JoinType.RIGHT);
    //Pretty sure the last join is the one right join we just
    //added
    const lastJoin = _joins[_joins.length - 1];
    return join_1.rightJoin(query, toTable, () => lastJoin.from, () => lastJoin.to);
}
exports.rightJoinFromPk = rightJoinFromPk;
//# sourceMappingURL=right.js.map