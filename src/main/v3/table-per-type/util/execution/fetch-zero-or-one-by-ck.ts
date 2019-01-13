import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {FetchZeroOrOneResult, fetchZeroOrOne} from "./fetch-zero-or-one";
import {CandidateKey} from "../../../candidate-key";

export function fetchZeroOrOneByCk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : CandidateKey<TableT>
) : (
    Promise<FetchZeroOrOneResult<TableT>>
) {
    return fetchZeroOrOne<TableT>(
        connection,
        table,
        TableUtil.eqCandidateKey(table, ck)
    );
}