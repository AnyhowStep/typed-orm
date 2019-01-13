import {ITable, TableUtil} from "../../../../table";
import {IConnection, DeleteZeroOrOneResult} from "../../../../execution";
import {deleteZeroOrOne} from "./delete-zero-or-one";
import {Key} from "../../../../key";
import {PrimaryKey} from "../../../../primary-key";

export function deleteZeroOrOneByPk<
    TableT extends ITable & { deleteAllowed : true, primaryKey : Key }
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