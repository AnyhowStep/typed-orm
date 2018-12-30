import {IConnection, UpdateResult} from "../../../execution";
import {QueryTreeUtil} from "../../../query-tree";
import {queryTree, ExecutableUpdate} from "../query";

export async function execute (
    update : ExecutableUpdate,
    connection : IConnection
) : (
    Promise<UpdateResult>
) {
    if (update._assignments.length == 0) {
        return {
            fieldCount   : -1,
            affectedRows : -1,
            insertId     : 0,
            serverStatus : -1,
            warningCount : -1,
            message      : "No SET clause, did not execute",
            protocol41   : true,
            changedRows  : 0,

            //Alias for affectedRows
            foundRowCount : -1,
            //Alias for changedRows
            updatedRowCount : 0,
        };
    }
    const sql = QueryTreeUtil.toSqlPretty(queryTree(update));
    const result = await connection.update(sql);

    return result;
}