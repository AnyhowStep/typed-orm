import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {FetchOneResult, fetchOne} from "./fetch-one";
import {CandidateKey} from "../../../candidate-key";
import {PrimaryKey} from "../../../primary-key";

export function fetchOneByPk<
    TableT extends ITable & { primaryKey : CandidateKey }
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : (
    Promise<FetchOneResult<TableT>>
) {
    return fetchOne<TableT>(
        connection,
        table,
        TableUtil.eqPrimaryKey(table, pk)
    );
}