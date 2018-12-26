"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_pk_1 = require("./join-pk");
const join_1 = require("../../../../join");
function leftJoinPk(query, delegate, toTable) {
    return join_pk_1.joinPk(query, delegate, toTable, true, join_1.JoinType.LEFT);
}
exports.leftJoinPk = leftJoinPk;
//# sourceMappingURL=left.js.map