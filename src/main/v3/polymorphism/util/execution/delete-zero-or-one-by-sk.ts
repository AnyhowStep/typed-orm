import {ITable, TableUtil} from "../../../table";
import {IConnection, DeleteZeroOrOneResult} from "../../../execution";
import {deleteZeroOrOne} from "./delete-zero-or-one";
import {SuperKey, eqSuperKey} from "../operation";

export function deleteZeroOrOneBySk<
    TableT extends ITable & { deleteAllowed : true }
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    sk : SuperKey<TableT>
) : (
    Promise<DeleteZeroOrOneResult>
) {
    return deleteZeroOrOne<TableT>(
        connection,
        table,
        eqSuperKey(table, sk)
    );
}