"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_pk_1 = require("../join-pk");
function leftJoinFromPk(fromTable, toTable) {
    return join_pk_1.leftJoinPk(toTable, fromTable).swap();
}
exports.leftJoinFromPk = leftJoinFromPk;
//# sourceMappingURL=left.js.map