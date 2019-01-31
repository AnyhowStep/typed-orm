import {ExecutableUpdate} from "./query-tree";
import {queryTree} from "./query-tree";
import {QueryTreeUtil} from "../../../query-tree";

export function printSql (
    update : ExecutableUpdate
) {
    const sql = QueryTreeUtil.toSql(queryTree(update));
    console.log(sql);
}