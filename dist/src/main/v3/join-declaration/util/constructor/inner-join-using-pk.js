"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inner_join_1 = require("./inner-join");
function innerJoinUsingPk(fromTable, toTable) {
    return inner_join_1.innerJoin(fromTable, toTable, () => toTable.primaryKey.map(columnName => fromTable.columns[columnName]), () => toTable.primaryKey.map(columnName => toTable.columns[columnName]));
}
exports.innerJoinUsingPk = innerJoinUsingPk;
//# sourceMappingURL=inner-join-using-pk.js.map