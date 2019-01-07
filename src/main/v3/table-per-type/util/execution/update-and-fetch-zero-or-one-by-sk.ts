import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {UpdateAndFetchZeroOrOneResult, updateAndFetchZeroOrOne} from "./update-and-fetch-zero-or-one";
import {SuperKey, eqSuperKey} from "../operation";

export function updateAndFetchZeroOrOneBySk<
    TableT extends ITable,
    DelegateT extends SetDelegate<TableT>
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    sk : SuperKey<TableT>,
    delegate : DelegateT
) : (
    AssertValidSetDelegate_Hack<
        TableT,
        DelegateT,
        Promise<UpdateAndFetchZeroOrOneResult<TableT, DelegateT>>
    >
) {
    return updateAndFetchZeroOrOne<TableT, DelegateT>(
        connection,
        table,
        eqSuperKey(table, sk),
        delegate
    );
}