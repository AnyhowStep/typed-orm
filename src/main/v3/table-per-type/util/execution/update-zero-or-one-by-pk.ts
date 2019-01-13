import {ITable, TableUtil} from "../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {updateZeroOrOne} from "./update-zero-or-one";
import {Key} from "../../../key";
import {PrimaryKey} from "../../../primary-key";

export function updateZeroOrOneByPk<
    TableT extends ITable & { primaryKey : Key },
    DelegateT extends SetDelegate<TableT>
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>,
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