import {ExecutableDelete} from "../../delete";
import {queryTree} from "./query-tree";
import {QueryTreeUtil} from "../../../query-tree";

export function printSql (
    del : ExecutableDelete
) {
    const sql = QueryTreeUtil.toSql(queryTree(del));
    console.log(sql);
}