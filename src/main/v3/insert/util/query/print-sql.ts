import {ITable} from "../../../table";
import {IInsert, InsertRow} from "../../insert";
import {queryTree} from "./query-tree";
import {QueryTreeUtil} from "../../../query-tree";

export function printSql (
    insert : IInsert & { _values : InsertRow<ITable>[] }
) {
    const sql = QueryTreeUtil.toSqlPretty(queryTree(insert));
    console.log(sql);
}