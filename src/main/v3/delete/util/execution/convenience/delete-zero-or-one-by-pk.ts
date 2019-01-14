import {TableWithPk, DeletableTable, TableUtil} from "../../../../table";
import {IConnection, DeleteZeroOrOneResult} from "../../../../execution";
import {deleteZeroOrOne} from "./delete-zero-or-one";
import {PrimaryKey} from "../../../../primary-key";

export function deleteZeroOrOneByPk<
    TableT extends DeletableTable & TableWithPk
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : (
    Promise<DeleteZeroOrOneResult>
) {
    return deleteZeroOrOne(
        connection,
        table,
        TableUtil.eqPrimaryKey(table, pk)
    );
}