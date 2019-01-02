import {ITable, TableUtil} from "../../../table";
import {IConnection, DeleteZeroOrOneResult} from "../../../execution";
import {deleteZeroOrOne} from "./delete-zero-or-one";

export function deleteZeroOrOneByCk<
    TableT extends ITable & { deleteAllowed : true }
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : TableUtil.CandidateKey<TableT>
) : (
    Promise<DeleteZeroOrOneResult>
) {
    return deleteZeroOrOne<TableT>(
        connection,
        table,
        TableUtil.eqCandidateKey(table, ck)
    );
}