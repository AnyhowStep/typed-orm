import {ITable, TableUtil} from "../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {updateZeroOrOne} from "./update-zero-or-one";
import {CandidateKey} from "../../../candidate-key";

export function updateZeroOrOneByPk<
    TableT extends ITable & { primaryKey : CandidateKey },
    DelegateT extends SetDelegate<TableT>
> (
    connection : IConnection,
    table : TableT,
    pk : TableUtil.PrimaryKey<TableT>,
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
        TableUtil.eqPrimaryKey(table, pk),
        delegate
    );
}