import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {UpdateAndFetchOneResult, updateAndFetchOne} from "./update-and-fetch-one";
import { Key } from "../../../key";
import {PrimaryKey} from "../../../primary-key";

export function updateAndFetchOneByPk<
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
        Promise<UpdateAndFetchOneResult<TableT, DelegateT>>
    >
) {
    return updateAndFetchOne<TableT, DelegateT>(
        connection,
        table,
        TableUtil.eqPrimaryKey(table, pk),
        delegate
    );
}