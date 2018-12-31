import {ITable, TableUtil} from "../../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../../execution";
import {SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack} from "../../constructor";
import {QueryUtil} from "../../../../query";
import {CandidateKey} from "../../../../candidate-key";

export function updateZeroOrOneByPk<
    TableT extends ITable & { primaryKey : CandidateKey },
    DelegateT extends SingleTableSetDelegateFromTable<TableT>
> (
    connection : IConnection,
    table : TableT,
    pk : TableUtil.PrimaryKey<TableT>,
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
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .set(delegate as any)
        .executeUpdateZeroOrOne(connection) as any;
}