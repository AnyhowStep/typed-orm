"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const from_1 = require("./from");
const delete_1 = require("../../../delete");
const delete_2 = require("./delete");
function deleteZeroOrOne(connection, table, where) {
    if (table.parents.length == 0) {
        return delete_1.DeleteUtil.deleteZeroOrOne(connection, table, where);
    }
    return connection.transactionIfNotInOne(async (connection) => {
        const resultRef = await query_1.QueryUtil.fetchZeroOrOne(query_1.QueryUtil.select(query_1.QueryUtil.where(from_1.from(table), () => where), ((c) => [c])), connection);
        //There may be tables in this array that cannot be deleted from.
        //This is not so bad. We let run-time errors catch it for now.
        //TODO-FEATURE, Implement way to check if a table and its parents
        //can all be deleted, shouldn't be too hard.
        const tables = delete_2.calculateDeleteOrder(table);
        if (resultRef == undefined) {
            //Nothing to delete
            return {
                fieldCount: -1,
                affectedRows: 0,
                //Should always be zero
                insertId: 0,
                serverStatus: -1,
                warningCount: 0,
                message: `No rows found for ${table.alias}, no rows deleted`,
                protocol41: true,
                //Should always be zero
                changedRows: 0,
                //Alias for affectedRows + warningCount
                rawFoundRowCount: 0,
                //Alias for affectedRows
                rawDeletedRowCount: 0,
                deletedTableCount: tables.length,
                foundRowCount: 0,
                deletedRowCount: 0,
            };
        }
        for (let t of tables) {
            await delete_1.DeleteUtil.deleteOneByCk(connection, t, 
            //This should have all the candidate key values we need.
            resultRef[t.alias]);
        }
        return {
            fieldCount: -1,
            affectedRows: tables.length,
            //Should always be zero
            insertId: 0,
            serverStatus: -1,
            warningCount: 0,
            message: ``,
            protocol41: true,
            //Should always be zero
            changedRows: 0,
            //Alias for affectedRows + warningCount
            rawFoundRowCount: tables.length,
            //Alias for affectedRows
            rawDeletedRowCount: tables.length,
            deletedTableCount: tables.length,
            foundRowCount: 1,
            deletedRowCount: 1,
        };
    });
}
exports.deleteZeroOrOne = deleteZeroOrOne;
//# sourceMappingURL=delete-zero-or-one.js.map