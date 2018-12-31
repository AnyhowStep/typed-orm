import {ITable, TableUtil} from "../../../../table";
import {IConnection, UpdateOneResult} from "../../../../execution";
import {SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack} from "../../constructor";
import {QueryUtil} from "../../../../query";

export function updateOneByCk<
    TableT extends ITable,
    DelegateT extends SingleTableSetDelegateFromTable<TableT>
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : TableUtil.CandidateKey<TableT>,
    delegate : DelegateT
) : (
    AssertValidSingleTableSetDelegateFromTable_Hack<
        TableT,
        DelegateT,
        Promise<UpdateOneResult>
    >
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .set(delegate as any)
        .executeUpdateOne(connection) as any;
}