import {ITable} from "../../../table";
import {IInsert, InsertRow} from "../../insert";
import {IConnection, InsertResult} from "../../../execution";
import { QueryTreeUtil } from "../../../query-tree";
import {queryTree} from "../query";

//TODO
export type Execute<
    _InsertT extends IInsert & { _values : InsertRow<ITable>[] }
> = (
    InsertResult
);
export function execute<
    InsertT extends IInsert & { _values : InsertRow<ITable>[] }
> (
    insert : InsertT,
    connection : IConnection
) : (
    Promise<Execute<InsertT>>
) {
    const sql = QueryTreeUtil.toSqlPretty(queryTree(insert));
    return connection.insert(sql);
}