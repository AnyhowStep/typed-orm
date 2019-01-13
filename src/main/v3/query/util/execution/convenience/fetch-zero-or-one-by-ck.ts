import {ITable, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {CandidateKey} from "../../../../candidate-key";

export function fetchZeroOrOneByCk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    ck : CandidateKey<TableT>
) : Promise<Row<TableT>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .select(c => [c])
        .fetchZeroOrOne(connection) as any;
}