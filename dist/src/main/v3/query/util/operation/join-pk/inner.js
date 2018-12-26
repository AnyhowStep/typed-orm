"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_pk_1 = require("./join-pk");
const join_1 = require("../../../../join");
function innerJoinPk(query, delegate, toTable) {
    return join_pk_1.joinPk(query, delegate, toTable, false, join_1.JoinType.INNER);
}
exports.innerJoinPk = innerJoinPk;
//# sourceMappingURL=inner.js.map