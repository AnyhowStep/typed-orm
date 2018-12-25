"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_pk_1 = require("./join-using-pk");
const join_1 = require("../../../join");
function leftJoinUsingPk(fromTable, toTable) {
    return join_using_pk_1.invokeJoinUsingPk(fromTable, toTable, true, join_1.JoinType.LEFT);
}
exports.leftJoinUsingPk = leftJoinUsingPk;
//# sourceMappingURL=left-join-using-pk.js.map