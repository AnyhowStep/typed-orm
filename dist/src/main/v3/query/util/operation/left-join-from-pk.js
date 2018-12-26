"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const left_join_1 = require("./left-join");
//TODO-REFACTOR Fix this ugly shit
function leftJoinUsingFromPk(query, fromTableDelegate, toTable) {
    const tables = {};
    for (let join of query._joins) {
        tables[join.aliasedTable.alias] = join.aliasedTable;
    }
    let fromTableObj = fromTableDelegate(tables);
    if (!(fromTableObj.alias in tables)) {
        throw new Error(`Invalid from table ${fromTableObj.alias}`);
    }
    //Just to be sure
    const fromTable = tables[fromTableObj.alias];
    return left_join_1.leftJoin(query, toTable, () => fromTable.primaryKey.map(columnName => fromTable.columns[columnName]), () => fromTable.primaryKey.map(columnName => toTable.columns[columnName]));
}
exports.leftJoinUsingFromPk = leftJoinUsingFromPk;
//# sourceMappingURL=left-join-from-pk.js.map