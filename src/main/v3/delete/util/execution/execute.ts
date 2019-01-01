import {ExecutableDelete} from "../../delete";
import {IConnection, DeleteResult} from "../../../execution";
import {QueryTreeUtil} from "../../../query-tree";
import {queryTree} from "../query";

export async function execute (
    del : ExecutableDelete,
    connection : IConnection
) : (
    Promise<DeleteResult>
) {
    const sql = QueryTreeUtil.toSqlPretty(queryTree(del));
    const result = await connection.delete(sql);

    return {
        ...result,
        deletedTableCount : del._tables.length,
    };
}