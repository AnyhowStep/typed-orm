import {ExecutableDelete} from "../../delete";
import {IConnection, RawDeleteResult} from "../../../execution";
import {QueryTreeUtil} from "../../../query-tree";
import {queryTree} from "../query";

export async function execute (
    del : ExecutableDelete,
    connection : IConnection
) : (
    Promise<RawDeleteResult>
) {
    const sql = QueryTreeUtil.toSqlPretty(queryTree(del));
    const result = await connection.delete(sql);

    return result;
}