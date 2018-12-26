"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../join");
function joinPk(query, delegate, toTable, nullable, joinType) {
    const tables = {};
    for (let join of query._joins) {
        tables[join.aliasedTable.alias] = join.aliasedTable;
    }
    let delegateResult = delegate(tables);
    if (!(delegateResult.alias in tables)) {
        throw new Error(`Invalid from table ${delegateResult.alias}`);
    }
    const fromTable = tables[delegateResult.alias];
    return join_1.join(query, toTable, () => toTable.primaryKey.map(columnName => fromTable.columns[columnName]), () => toTable.primaryKey.map(columnName => toTable.columns[columnName]), nullable, joinType);
}
exports.joinPk = joinPk;
//# sourceMappingURL=join-pk.js.map