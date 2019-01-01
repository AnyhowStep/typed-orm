import {ITable, TableUtil} from "../../../../table";
import {IConnection, DeleteOneResult} from "../../../../execution";
import {deleteOne} from "./delete-one";

export function deleteOneBySk<
    TableT extends ITable & { deleteAllowed : true }
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    sk : TableUtil.SuperKey<TableT>
) : (
    Promise<DeleteOneResult>
) {
    return deleteOne(
        connection,
        table,
        TableUtil.eqSuperKey(table, sk)
    );
}