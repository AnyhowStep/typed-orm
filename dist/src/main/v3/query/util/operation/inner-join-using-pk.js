"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inner_join_1 = require("./inner-join");
function innerJoinUsingPk(query, fromTableDelegate, toTable) {
    const tables = {};
    for (let join of query._joins) {
        tables[join.aliasedTable.alias] = join.aliasedTable;
    }
    let fromTable = fromTableDelegate(tables);
    if (!(fromTable.alias in tables)) {
        throw new Error(`Invalid from table ${fromTable.alias}`);
    }
    //Just to be sure
    fromTable = tables[fromTable.alias];
    return inner_join_1.innerJoin(query, toTable, () => toTable.primaryKey.map(columnName => fromTable.columns[columnName]), () => toTable.primaryKey.map(columnName => toTable.columns[columnName]));
}
exports.innerJoinUsingPk = innerJoinUsingPk;
//# sourceMappingURL=inner-join-using-pk.js.map