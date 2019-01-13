import {ITable, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";

export function fetchZeroOrOneByPk<
    TableT extends ITable & { primaryKey : CandidateKey }
> (
    connection : IConnection,
    table : TableT,
    pk : TableUtil.PrimaryKey<TableT>
) : Promise<Row<TableT>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .select(c => [c])
        .fetchZeroOrOne(connection) as any;
}