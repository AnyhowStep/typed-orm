import {ITable} from "../../../table";
import {IInsert, InsertRow, InsertModifier} from "../../insert";
import {IConnection, InsertResult} from "../../../execution";
import { QueryTreeUtil } from "../../../query-tree";
import {queryTree} from "../query";

export type Execute<
    InsertT extends IInsert & { _values : InsertRow<ITable>[] }
> = (
    InsertResult &
    (
        InsertT["_table"]["autoIncrement"] extends string ?
        {
            [k in InsertT["_table"]["autoIncrement"]] : (
                InsertModifier.IGNORE extends InsertT["_modifier"] ?
                undefined|bigint :
                undefined extends InsertT["_modifier"] ?
                bigint :
                InsertModifier.REPLACE extends InsertT["_modifier"] ?
                bigint :
                never
            )
        } :
        {}
    )
);
export async function execute<
    InsertT extends IInsert & { _values : InsertRow<ITable>[] }
> (
    insert : InsertT,
    connection : IConnection
) : (
    Promise<Execute<InsertT>>
) {
    const sql = QueryTreeUtil.toSqlPretty(queryTree(insert));
    const result = await connection.insert(sql);
    if (insert._table.autoIncrement == undefined) {
        return result as any;
    } else {
        if (result.insertId == 0n) {
            if (insert._modifier != InsertModifier.IGNORE) {
                throw new Error(`Sucessful insertions should return an insertId for modifier ${insert._modifier}`);
            }
            return {
                ...(result as any),
                [insert._table.autoIncrement] : undefined,
            };
        } else {
            return {
                ...(result as any),
                [insert._table.autoIncrement] : result.insertId,
            };
        }
    }
}