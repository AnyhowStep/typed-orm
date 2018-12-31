import {ITable, TableUtil} from "../../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../../execution";
import {SetDelegateFromJoinArray} from "../../constructor";
import {IJoin} from "../../../../join";
import {QueryUtil} from "../../../../query";

/*
    Uses a transaction to ensure you really update zero or one.

    The benefit is never messing up.
    The downside is requiring a transaction.

    However, I err on the side of correctness and safety
    over performance... For now.
*/
export async function updateZeroOrOneByCk<
    TableT extends ITable
> (
    connection : IConnection & TableUtil.AssertHasCandidateKey<TableT>,
    table : TableT,
    ck : TableUtil.CandidateKey<TableT>,
    delegate : SetDelegateFromJoinArray<IJoin<{
        readonly aliasedTable : TableT,
        readonly columns : TableT["columns"],
        readonly nullable : false,
    }>[]>
) : Promise<UpdateZeroOrOneResult> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .set(delegate as any)
        .executeUpdateZeroOrOne(connection);

}