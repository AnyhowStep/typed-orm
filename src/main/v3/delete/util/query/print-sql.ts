import {ExecutableDelete} from "../../delete";
import {queryTree} from "./query-tree";
import {QueryTreeUtil} from "../../../query-tree";

export function printSql (
    del : ExecutableDelete
) {
    const sql = QueryTreeUtil.toSqlPretty(queryTree(del));
    console.log(sql);
}