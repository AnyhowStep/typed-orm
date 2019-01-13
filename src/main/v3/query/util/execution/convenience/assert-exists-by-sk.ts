import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {SuperKey} from "../../../../super-key";

export function assertExistsBySk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    sk : SuperKey<TableT>
) : (
    Promise<void>
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqSuperKey(table, sk) as any)
        .assertExists(connection) as any;
}