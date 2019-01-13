import {ITable, TableUtil} from "../../../../table";
import {IConnection, DeleteOneResult} from "../../../../execution";
import {deleteOne} from "./delete-one";
import {SuperKey} from "../../../../super-key";

export function deleteOneBySk<
    TableT extends ITable & { deleteAllowed : true }
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    sk : SuperKey<TableT>
) : (
    Promise<DeleteOneResult>
) {
    return deleteOne(
        connection,
        table,
        TableUtil.eqSuperKey(table, sk)
    );
}