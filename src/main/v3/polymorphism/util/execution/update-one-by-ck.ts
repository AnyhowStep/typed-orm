import {ITable, TableUtil} from "../../../table";
import {IConnection, UpdateOneResult} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {updateOne} from "./update-one";

export function updateOneByCk<
    TableT extends ITable,
    DelegateT extends SetDelegate<TableT>
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : TableUtil.CandidateKey<TableT>,
    delegate : DelegateT
) : (
    AssertValidSetDelegate_Hack<
        TableT,
        DelegateT,
        Promise<UpdateOneResult>
    >
) {
    return updateOne<TableT, DelegateT>(
        connection,
        table,
        TableUtil.eqCandidateKey(table, ck),
        delegate
    );
}