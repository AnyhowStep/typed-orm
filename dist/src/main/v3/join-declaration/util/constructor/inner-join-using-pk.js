"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_pk_1 = require("./join-using-pk");
const join_1 = require("../../../join");
function innerJoinUsingPk(fromTable, toTable) {
    return join_using_pk_1.invokeJoinUsingPk(fromTable, toTable, false, join_1.JoinType.INNER);
}
exports.innerJoinUsingPk = innerJoinUsingPk;
//# sourceMappingURL=inner-join-using-pk.js.map