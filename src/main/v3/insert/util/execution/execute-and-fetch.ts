import {TableUtil} from "../../../table";
import {ExecutableInsert} from "../../insert";
import {IConnection} from "../../../execution";
import {execute} from "./execute";
import {Row} from "../../../row";
import {QueryUtil} from "../../../query";

export async function executeAndFetch<
    InsertT extends ExecutableInsert
> (
    insert : InsertT,
    connection : (
        IConnection &
        TableUtil.AssertHasCandidateKey<InsertT["_table"]>
    )
) : (
    Promise<Row<InsertT["_table"]>>
) {
    return connection.transactionIfNotInOne(async (connection) => {
        const result = await execute(insert, connection);
        if (result.insertId > 0n && insert._table.autoIncrement != undefined) {
            //Prefer auto-increment id, if possible
            const fetchedRow = await QueryUtil.fetchOneByCk(
                connection,
                insert._table,
                {
                    [insert._table.autoIncrement] : result.insertId
                }
            );
            await connection.pool.onInsertAndFetch.invoke({
                type : "insertAndFetch",
                table : insert._table,
                connection,
                row : fetchedRow,
            });
            return fetchedRow;
        } else {
            //*Try* and get a candidate key.
            //May fail if the candidate keys are Expr
            const lastRow = insert._values[insert._values.length-1];
            const fetchedRow = await QueryUtil.fetchOneByCk(
                connection,
                insert._table,
                lastRow
            );
            await connection.pool.onInsertAndFetch.invoke({
                type : "insertAndFetch",
                table : insert._table,
                connection,
                row : fetchedRow,
            });
            return fetchedRow;
        }
    }) as any;
}