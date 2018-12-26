"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_pk_1 = require("./join-pk");
const join_1 = require("../../../../join");
function leftJoinPk(fromTable, toTable) {
    return join_pk_1.joinPk(fromTable, toTable, true, join_1.JoinType.LEFT);
}
exports.leftJoinPk = leftJoinPk;
//# sourceMappingURL=left.js.map