"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_delegate_1 = require("./join-delegate");
function invokeJoinUsingPk(fromTable, toTable, nullable, joinType) {
    return join_delegate_1.invokeJoinDelegate(fromTable, toTable, () => toTable.primaryKey.map(columnName => fromTable.columns[columnName]), () => toTable.primaryKey.map(columnName => toTable.columns[columnName]), nullable, joinType);
}
exports.invokeJoinUsingPk = invokeJoinUsingPk;
//# sourceMappingURL=join-using-pk.js.map