import {DeletableTable, TableUtil} from "../../../../table";
import {IConnection, DeleteZeroOrOneResult} from "../../../../execution";
import {deleteZeroOrOne} from "./delete-zero-or-one";
import {SuperKey} from "../../../../super-key";

export function deleteZeroOrOneBySk<
    TableT extends DeletableTable
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    sk : SuperKey<TableT>
) : (
    Promise<DeleteZeroOrOneResult>
) {
    return deleteZeroOrOne(
        connection,
        table,
        TableUtil.eqSuperKey(table, sk)
    );
}