import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {FetchOneResult, fetchOne} from "./fetch-one";

export function fetchOneByCk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : TableUtil.CandidateKey<TableT>
) : (
    Promise<FetchOneResult<TableT>>
) {
    return fetchOne<TableT>(
        connection,
        table,
        TableUtil.eqCandidateKey(table, ck)
    );
}