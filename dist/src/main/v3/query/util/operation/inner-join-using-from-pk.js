"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inner_join_1 = require("./inner-join");
function innerJoinUsingFromPk(query, fromTableDelegate, toTable) {
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
    return inner_join_1.innerJoin(query, toTable, () => fromTable.primaryKey.map(columnName => fromTable.columns[columnName]), () => fromTable.primaryKey.map(columnName => toTable.columns[columnName]));
}
exports.innerJoinUsingFromPk = innerJoinUsingFromPk;
//# sourceMappingURL=inner-join-using-from-pk.js.map