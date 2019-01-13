import {ITable, TableUtil} from "../../../table";
import {IConnection, DeleteOneResult} from "../../../execution";
import {deleteOne} from "./delete-one";
import {Key} from "../../../key";
import {PrimaryKey} from "../../../primary-key";

export function deleteOneByPk<
    TableT extends ITable & { deleteAllowed : true, primaryKey : Key }
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : (
    Promise<DeleteOneResult>
) {
    return deleteOne<TableT>(
        connection,
        table,
        TableUtil.eqPrimaryKey(table, pk)
    );
}