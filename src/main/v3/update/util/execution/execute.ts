import {IConnection, UpdateResult} from "../../../execution";
import {QueryTreeUtil} from "../../../query-tree";
import {queryTree, ExecutableUpdate} from "../query";

export async function execute (
    update : ExecutableUpdate,
    connection : IConnection
) : (
    Promise<UpdateResult>
) {
    const sql = QueryTreeUtil.toSqlPretty(queryTree(update));
    const result = await connection.update(sql);

    return result;
}