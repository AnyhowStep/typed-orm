"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = require("./execute");
const query_1 = require("../../../query");
async function executeAndFetch(insert, connection) {
    return connection.transactionIfNotInOne(async (connection) => {
        const result = await execute_1.execute(insert, connection);
        if (result.insertId > 0n && insert._table.autoIncrement != undefined) {
            //Prefer auto-increment id, if possible
            return query_1.QueryUtil.fetchZeroOrOneByCk(connection, insert._table, {
                [insert._table.autoIncrement]: result.insertId
            });
        }
        else {
            //*Try* and get a candidate key.
            //May fail if the candidate keys are Expr
            const lastRow = insert._values[insert._values.length - 1];
            return query_1.QueryUtil.fetchZeroOrOneByCk(connection, insert._table, lastRow);
        }
    });
}
exports.executeAndFetch = executeAndFetch;
//# sourceMappingURL=execute-and-fetch.js.map