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
            rawFoundRowCount : -1,
            //Alias for changedRows
            rawUpdatedRowCount : 0,

            //Zero because we didn't attempt to update any tables
            updatedTableCount : 0,
            foundRowCount : -1,
        };
    }
    const sql = QueryTreeUtil.toSqlPretty(queryTree(update));
    const result = await connection.update(sql);

    const tableAliases = new Set<string>();
    for (let assignment of update._assignments) {
        tableAliases.add(assignment.tableAlias);
    }
    const updatedTableCount = tableAliases.size;
    const foundRowCount = result.rawFoundRowCount / updatedTableCount;
    return {
        ...result,
        updatedTableCount,
        foundRowCount,
    };
}