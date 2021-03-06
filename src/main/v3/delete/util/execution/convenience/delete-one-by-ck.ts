import {DeletableTable, TableUtil} from "../../../../table";
import {IConnection, DeleteOneResult} from "../../../../execution";
import {deleteOne} from "./delete-one";
import {CandidateKey} from "../../../../candidate-key";

export function deleteOneByCk<
    TableT extends DeletableTable
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : CandidateKey<TableT>
) : (
    Promise<DeleteOneResult>
) {
    return deleteOne(
        connection,
        table,
        TableUtil.eqCandidateKey(table, ck)
    );
}