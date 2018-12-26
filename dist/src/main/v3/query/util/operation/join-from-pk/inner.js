"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_from_pk_1 = require("./join-from-pk");
const join_1 = require("../../../../join");
function innerJoinFromPk(query, delegate, toTable) {
    return join_from_pk_1.joinFromPk(query, delegate, toTable, false, join_1.JoinType.INNER);
}
exports.innerJoinFromPk = innerJoinFromPk;
//# sourceMappingURL=inner.js.map