"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_pk_1 = require("../join-pk");
function innerJoinFromPk(fromTable, toTable) {
    return join_pk_1.innerJoinPk(toTable, fromTable).swap();
}
exports.innerJoinFromPk = innerJoinFromPk;
//# sourceMappingURL=inner.js.map