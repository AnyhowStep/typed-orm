import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {CandidateKey} from "../../../../candidate-key";

export function existsByPk<
    TableT extends ITable & { primaryKey : CandidateKey }
> (
    connection : IConnection,
    table : TableT,
    pk : TableUtil.PrimaryKey<TableT>
) : (
    Promise<boolean>
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .exists(connection) as any;
}