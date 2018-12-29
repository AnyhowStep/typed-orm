import {IConnection, UpdateResult} from "../../../execution";
import {QueryTreeUtil} from "../../../query-tree";
import {queryTree, ExecutableUpdate} from "../query";

/*export type Execute<
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
);*/
export async function execute (
    update : ExecutableUpdate,
    connection : IConnection
) : (
    Promise<UpdateResult>
) {
    const sql = QueryTreeUtil.toSqlPretty(queryTree(update));
    const result = await connection.update(sql);

    return result;
}