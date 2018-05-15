"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tableToReference(table) {
    const columns = {};
    for (let name in table.columns) {
        if (table.columns.hasOwnProperty(name)) {
            columns[name] = table.columns[name];
        }
    }
    //Some day, we will have REAL string-literal types.
    //For now, the best we have is `TypeT extends string`,
    //Which has a lot of drawbacks...
    const result = {
        [table.alias]: columns
    };
    return result;
}
exports.tableToReference = tableToReference;
//# sourceMappingURL=table-operation.js.map