import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";

export function existsBySk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    sk : TableUtil.SuperKey<TableT>
) : (
    Promise<boolean>
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqSuperKey(table, sk) as any)
        .exists(connection) as any;
}