"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inner_join_using_pk_1 = require("./inner-join-using-pk");
function innerJoinUsingFromPk(fromTable, toTable) {
    return inner_join_using_pk_1.innerJoinUsingPk(toTable, fromTable).swap();
}
exports.innerJoinUsingFromPk = innerJoinUsingFromPk;
//# sourceMappingURL=inner-join-using-from-pk.js.map