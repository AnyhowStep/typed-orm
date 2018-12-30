import {ITable, TableUtil} from "../../../../table";
import {TypeMapUtil} from "../../../../type-map";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";

export function fetchZeroOrOneBySk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    sk : TableUtil.SuperKey<TableT>
) : Promise<TypeMapUtil.FromTable<TableT>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqSuperKey(table, sk) as any)
        .select(c => [c])
        .fetchZeroOrOne(connection) as any;
}