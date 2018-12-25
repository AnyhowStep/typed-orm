"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const left_join_1 = require("./left-join");
//TODO-REFACTOR Most of this code is copy-pasted, duplicate code
function leftJoinUsingPk(query, fromTableDelegate, toTable) {
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
    return left_join_1.leftJoin(query, toTable, () => toTable.primaryKey.map(columnName => fromTable.columns[columnName]), () => toTable.primaryKey.map(columnName => toTable.columns[columnName]));
}
exports.leftJoinUsingPk = leftJoinUsingPk;
//# sourceMappingURL=left-join-using-pk.js.map