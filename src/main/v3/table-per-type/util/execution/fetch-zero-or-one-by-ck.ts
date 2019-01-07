import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {FetchZeroOrOneResult, fetchZeroOrOne} from "./fetch-zero-or-one";

export function fetchZeroOrOneByCk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : TableUtil.CandidateKey<TableT>
) : (
    Promise<FetchZeroOrOneResult<TableT>>
) {
    return fetchZeroOrOne<TableT>(
        connection,
        table,
        TableUtil.eqCandidateKey(table, ck)
    );
}