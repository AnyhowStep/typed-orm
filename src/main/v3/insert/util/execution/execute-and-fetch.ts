import {TableUtil} from "../../../table";
import {ExecutableInsert} from "../../insert";
import {IConnection} from "../../../execution";
import {execute} from "./execute";
import {TypeMapUtil} from "../../../type-map";
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
    Promise<TypeMapUtil.FromTable<InsertT["_table"]>>
) {
    return connection.transactionIfNotInOne(async (connection) => {
        const result = await execute(insert, connection);
        if (result.insertId > 0n && insert._table.autoIncrement != undefined) {
            //Prefer auto-increment id, if possible
            return QueryUtil.fetchOneByCk(
                connection,
                insert._table,
                {
                    [insert._table.autoIncrement] : result.insertId
                }
            );
        } else {
            //*Try* and get a candidate key.
            //May fail if the candidate keys are Expr
            const lastRow = insert._values[insert._values.length-1];
            return QueryUtil.fetchOneByCk(
                connection,
                insert._table,
                lastRow
            );
        }
    });
}