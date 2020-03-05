"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = require("./execute");
const query_1 = require("../../../query");
async function executeAndFetch(insert, connection) {
    return connection.transactionIfNotInOne(async (connection) => {
        const result = await execute_1.execute(insert, connection);
        if (result.insertId > 0n && insert._table.autoIncrement != undefined) {
            //Prefer auto-increment id, if possible
            const fetchedRow = await query_1.QueryUtil.fetchOneByCk(connection, insert._table, {
                [insert._table.autoIncrement]: result.insertId
            });
            await connection.pool.onInsertAndFetch.invoke({
                type: "insertAndFetch",
                table: insert._table,
                connection,
                row: fetchedRow,
            });
            return fetchedRow;
        }
        else {
            //*Try* and get a candidate key.
            //May fail if the candidate keys are Expr
            const lastRow = insert._values[insert._values.length - 1];
            const fetchedRow = await query_1.QueryUtil.fetchOneByCk(connection, insert._table, lastRow);
            await connection.pool.onInsertAndFetch.invoke({
                type: "insertAndFetch",
                table: insert._table,
                connection,
                row: fetchedRow,
            });
            return fetchedRow;
        }
    });
}
exports.executeAndFetch = executeAndFetch;
//# sourceMappingURL=execute-and-fetch.js.map