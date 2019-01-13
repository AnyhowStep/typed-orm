import {ITable, TableUtil} from "../../../../table";
import {IConnection, DeleteZeroOrOneResult} from "../../../../execution";
import {deleteZeroOrOne} from "./delete-zero-or-one";
import {CandidateKey} from "../../../../candidate-key";

export function deleteZeroOrOneByCk<
    TableT extends ITable & { deleteAllowed : true }
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : CandidateKey<TableT>
) : (
    Promise<DeleteZeroOrOneResult>
) {
    return deleteZeroOrOne(
        connection,
        table,
        TableUtil.eqCandidateKey(table, ck)
    );
}