import {ITable, TableUtil} from "../../../table";
import {IConnection, UpdateOneResult} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {updateOne} from "./update-one";
import {Key} from "../../../key";
import {PrimaryKey} from "../../../primary-key";

export function updateOneByPk<
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
        Promise<UpdateOneResult>
    >
) {
    return updateOne<TableT, DelegateT>(
        connection,
        table,
        TableUtil.eqPrimaryKey(table, pk),
        delegate
    );
}