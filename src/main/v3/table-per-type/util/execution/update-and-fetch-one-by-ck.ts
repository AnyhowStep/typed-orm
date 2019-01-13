import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {updateAndFetchOne, UpdateAndFetchOneResult} from "./update-and-fetch-one";
import {CandidateKey} from "../../../candidate-key";

export function updateAndFetchOneByCk<
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
        Promise<UpdateAndFetchOneResult<TableT, DelegateT>>
    >
) {
    return updateAndFetchOne<TableT, DelegateT>(
        connection,
        table,
        TableUtil.eqCandidateKey(table, ck),
        delegate
    );
}