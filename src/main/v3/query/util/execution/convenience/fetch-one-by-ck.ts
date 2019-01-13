import {ITable, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";

export function fetchOneByCk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    ck : TableUtil.CandidateKey<TableT>
) : Promise<Row<TableT>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .select(c => [c])
        .fetchOne(connection) as any;
}