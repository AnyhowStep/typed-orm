import {ExecutableInsert} from "../../insert";
import {queryTree} from "./query-tree";
import {QueryTreeUtil} from "../../../query-tree";

export function printSql (
    insert : ExecutableInsert
) {
    const sql = QueryTreeUtil.toSqlPretty(queryTree(insert));
    console.log(sql);
}