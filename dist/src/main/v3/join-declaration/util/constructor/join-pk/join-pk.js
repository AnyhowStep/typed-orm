"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../join");
function joinPk(fromTable, toTable, nullable, joinType) {
    return join_1.join(fromTable, toTable, () => toTable.primaryKey.map(columnName => fromTable.columns[columnName]), () => toTable.primaryKey.map(columnName => toTable.columns[columnName]), nullable, joinType);
}
exports.joinPk = joinPk;
//# sourceMappingURL=join-pk.js.map