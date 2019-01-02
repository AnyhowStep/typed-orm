import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {FetchOneResult, fetchOne} from "./fetch-one";
import {SuperKey, eqSuperKey} from "../operation";

export function fetchOneBySk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    sk : SuperKey<TableT>
) : (
    Promise<FetchOneResult<TableT>>
) {
    return fetchOne<TableT>(
        connection,
        table,
        eqSuperKey(table, sk)
    );
}