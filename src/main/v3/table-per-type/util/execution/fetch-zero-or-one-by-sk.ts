import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {FetchZeroOrOneResult, fetchZeroOrOne} from "./fetch-zero-or-one";
import {SuperKey, eqSuperKey} from "../operation";

export function fetchZeroOrOneBySk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    sk : SuperKey<TableT>
) : (
    Promise<FetchZeroOrOneResult<TableT>>
) {
    return fetchZeroOrOne<TableT>(
        connection,
        table,
        eqSuperKey(table, sk)
    );
}