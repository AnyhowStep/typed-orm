import {TableWithPk, DeletableTable, TableUtil} from "../../../../table";
import {IConnection, DeleteOneResult} from "../../../../execution";
import {deleteOne} from "./delete-one";
import {PrimaryKey} from "../../../../primary-key";

export function deleteOneByPk<
    TableT extends DeletableTable & TableWithPk
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : (
    Promise<DeleteOneResult>
) {
    return deleteOne(
        connection,
        table,
        TableUtil.eqPrimaryKey(table, pk)
    );
}