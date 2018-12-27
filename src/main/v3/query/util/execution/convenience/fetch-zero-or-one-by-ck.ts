import {ITable, TableUtil} from "../../../../table";
import {TypeMapUtil} from "../../../../type-map";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";

export function fetchZeroOrOneByCk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    ck : TableUtil.CandidateKey<TableT>
) : Promise<TypeMapUtil.FromTable<TableT>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .select(c => [c])
        .fetchZeroOrOne(connection) as any;
}