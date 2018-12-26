"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_pk_1 = require("./join-pk");
const join_1 = require("../../../../join");
function innerJoinPk(fromTable, toTable) {
    return join_pk_1.joinPk(fromTable, toTable, false, join_1.JoinType.INNER);
}
exports.innerJoinPk = innerJoinPk;
//# sourceMappingURL=inner.js.map