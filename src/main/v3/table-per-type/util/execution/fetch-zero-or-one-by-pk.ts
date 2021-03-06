import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {FetchZeroOrOneResult, fetchZeroOrOne} from "./fetch-zero-or-one";
import {Key} from "../../../key";
import {PrimaryKey} from "../../../primary-key";

export function fetchZeroOrOneByPk<
    TableT extends ITable & { primaryKey : Key }
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : (
    Promise<FetchZeroOrOneResult<TableT>>
) {
    return fetchZeroOrOne<TableT>(
        connection,
        table,
        TableUtil.eqPrimaryKey(table, pk)
    );
}