import {ITable, TableUtil} from "../../../table";
import {IConnection, DeleteOneResult} from "../../../execution";
import {deleteOne} from "./delete-one";
import {SuperKey, eqSuperKey} from "../operation";

export function deleteOneBySk<
    TableT extends ITable & { deleteAllowed : true }
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    sk : SuperKey<TableT>
) : (
    Promise<DeleteOneResult>
) {
    return deleteOne<TableT>(
        connection,
        table,
        eqSuperKey(table, sk)
    );
}