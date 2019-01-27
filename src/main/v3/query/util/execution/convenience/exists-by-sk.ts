import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {SuperKey} from "../../../../super-key";

export function existsBySk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    sk : SuperKey<TableT>
) : (
    Promise<boolean>
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .__unsafeWhere(() => TableUtil.eqSuperKey(table, sk) as any)
        .exists(connection) as any;
}