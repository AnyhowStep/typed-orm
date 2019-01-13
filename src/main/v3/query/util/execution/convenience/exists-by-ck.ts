import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {CandidateKey} from "../../../../candidate-key";

export function existsByCk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    ck : CandidateKey<TableT>
) : (
    Promise<boolean>
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .exists(connection) as any;
}