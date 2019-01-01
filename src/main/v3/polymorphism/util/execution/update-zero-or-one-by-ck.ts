import {ITable, TableUtil} from "../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../execution";
import {UpdateUtil} from "../../../update";
import {SetDelegate, AssertValidSetDelegate_Hack, update} from "./update";

export function updateZeroOrOneByCk<
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
        Promise<UpdateZeroOrOneResult>
    >
 ) {
    const executableUpdate = update<
        TableT,
        DelegateT
    >(
        table,
        TableUtil.eqCandidateKey(table, ck),
        delegate
    ) as any;
    return UpdateUtil.executeUpdateZeroOrOne(
        executableUpdate,
        connection
    ) as any;
}