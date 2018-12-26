"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const left_join_using_pk_1 = require("./left-join-using-pk");
function leftJoinUsingFromPk(fromTable, toTable) {
    return left_join_using_pk_1.leftJoinUsingPk(toTable, fromTable).swap();
}
exports.leftJoinUsingFromPk = leftJoinUsingFromPk;
//# sourceMappingURL=left-join-using-from-pk.js.map