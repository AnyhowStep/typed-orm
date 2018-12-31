import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";

export function assertExistsByCk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    ck : TableUtil.CandidateKey<TableT>
) : (
    Promise<void>
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .assertExists(connection) as any;
}