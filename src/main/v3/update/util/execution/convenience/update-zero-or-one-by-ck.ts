import {ITable, TableUtil} from "../../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../../execution";
import {SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack} from "../../constructor";
import {QueryUtil} from "../../../../query";
import {CandidateKey} from "../../../../candidate-key";

export function updateZeroOrOneByCk<
    TableT extends ITable,
    DelegateT extends SingleTableSetDelegateFromTable<TableT>
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : CandidateKey<TableT>,
    delegate : DelegateT
) : (
    AssertValidSingleTableSetDelegateFromTable_Hack<
        TableT,
        DelegateT,
        Promise<UpdateZeroOrOneResult>
    >
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .__unsafeWhere(() => TableUtil.eqCandidateKey(table, ck) as any)
        .set(delegate as any)
        .executeUpdateZeroOrOne(connection) as any;
}