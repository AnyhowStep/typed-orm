import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {CandidateKey} from "../../../../candidate-key";

export function assertExistsByPk<
    TableT extends ITable & { primaryKey : CandidateKey }
> (
    connection : IConnection,
    table : TableT,
    pk : TableUtil.PrimaryKey<TableT>
) : (
    Promise<void>
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .assertExists(connection) as any;
}