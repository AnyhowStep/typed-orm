import {ITable, TableUtil} from "../../../../table";
import {IConnection, DeleteOneResult} from "../../../../execution";
import { deleteOne } from "./delete-one";

export function deleteOneByCk<
    TableT extends ITable & { deleteAllowed : true }
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : TableUtil.CandidateKey<TableT>
) : (
    Promise<DeleteOneResult>
) {
    return deleteOne(
        connection,
        table,
        TableUtil.eqCandidateKey(table, ck)
    );
}