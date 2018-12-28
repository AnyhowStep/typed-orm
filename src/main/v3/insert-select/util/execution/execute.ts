import {IInsertSelect, InsertSelectRow, InsertSelectModifier} from "../../insert-select";
import {IConnection, InsertResult} from "../../../execution";
import {QueryUtil} from "../../../query";
import {ITable} from "../../../table";
import {QueryTreeUtil} from "../../../query-tree";
import {queryTree} from "../query";

export type Execute<
    InsertT extends (
        IInsertSelect &
        {
            _row : InsertSelectRow<QueryUtil.AfterSelectClause, ITable>
        }
    )
> = (
    InsertResult &
    (
        InsertT["_table"]["autoIncrement"] extends string ?
        {
            [k in InsertT["_table"]["autoIncrement"]] : (
                InsertSelectModifier.IGNORE extends InsertT["_modifier"] ?
                undefined|bigint :
                undefined extends InsertT["_modifier"] ?
                bigint :
                InsertSelectModifier.REPLACE extends InsertT["_modifier"] ?
                bigint :
                never
            )
        } :
        {}
    )
);

export async function execute<
    InsertT extends (
        IInsertSelect &
        {
            _row : InsertSelectRow<QueryUtil.AfterSelectClause, ITable>
        }
    )
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
            if (insert._modifier != InsertSelectModifier.IGNORE) {
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