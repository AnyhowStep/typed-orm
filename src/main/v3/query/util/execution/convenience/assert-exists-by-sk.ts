import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";

export function assertExistsBySk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    sk : TableUtil.SuperKey<TableT>
) : (
    Promise<void>
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqSuperKey(table, sk) as any)
        .assertExists(connection) as any;
}