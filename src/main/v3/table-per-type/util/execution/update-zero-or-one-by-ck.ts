import {ITable, TableUtil} from "../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {updateZeroOrOne} from "./update-zero-or-one";
import {CandidateKey} from "../../../candidate-key";

export function updateZeroOrOneByCk<
    TableT extends ITable,
    DelegateT extends SetDelegate<TableT>
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : CandidateKey<TableT>,
    delegate : DelegateT
) : (
    AssertValidSetDelegate_Hack<
        TableT,
        DelegateT,
        Promise<UpdateZeroOrOneResult>
    >
) {
    return updateZeroOrOne<TableT, DelegateT>(
        connection,
        table,
        TableUtil.eqCandidateKey(table, ck),
        delegate
    );
}