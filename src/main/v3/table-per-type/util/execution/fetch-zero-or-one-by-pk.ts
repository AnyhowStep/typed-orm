import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {FetchZeroOrOneResult, fetchZeroOrOne} from "./fetch-zero-or-one";
import {CandidateKey} from "../../../candidate-key";

export function fetchZeroOrOneByPk<
    TableT extends ITable & { primaryKey : CandidateKey }
> (
    connection : IConnection,
    table : TableT,
    pk : TableUtil.PrimaryKey<TableT>
) : (
    Promise<FetchZeroOrOneResult<TableT>>
) {
    return fetchZeroOrOne<TableT>(
        connection,
        table,
        TableUtil.eqPrimaryKey(table, pk)
    );
}