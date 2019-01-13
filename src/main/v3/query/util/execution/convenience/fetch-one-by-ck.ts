import {ITable, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {CandidateKey} from "../../../../candidate-key";

export function fetchOneByCk<
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
        .fetchOne(connection) as any;
}