import {ITable, TableUtil} from "../../../../table";
import {IConnection, UpdateResult} from "../../../../execution";
import {SetDelegateFromJoinArray} from "../../constructor";
import {IJoin} from "../../../../join";
import {QueryUtil} from "../../../../query";

export async function updateZeroOrOne<
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
) : Promise<UpdateResult> {
    return QueryUtil.newInstance()
        .from(table as any)
        .whereEqCandidateKey(
            table,
            ck
        )
        .set(delegate as any)
        .execute(connection);
}