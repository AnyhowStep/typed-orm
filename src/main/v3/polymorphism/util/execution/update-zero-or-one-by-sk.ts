import {ITable, TableUtil} from "../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {SuperKey, eqSuperKey} from "../operation";
import {updateZeroOrOne} from "./update-zero-or-one";

export function updateZeroOrOneBySk<
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
        Promise<UpdateZeroOrOneResult>
    >
 ) {
    return updateZeroOrOne<TableT, DelegateT>(
        connection,
        table,
        eqSuperKey(table, sk),
        delegate
    );
}