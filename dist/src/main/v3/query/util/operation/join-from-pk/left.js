"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_from_pk_1 = require("./join-from-pk");
const join_1 = require("../../../../join");
function leftJoinFromPk(query, delegate, toTable) {
    return join_from_pk_1.joinFromPk(query, delegate, toTable, true, join_1.JoinType.LEFT);
}
exports.leftJoinFromPk = leftJoinFromPk;
//# sourceMappingURL=left.js.map