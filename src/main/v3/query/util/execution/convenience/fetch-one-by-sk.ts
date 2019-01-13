import {ITable, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";

export function fetchOneBySk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    sk : TableUtil.SuperKey<TableT>
) : Promise<Row<TableT>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqSuperKey(table, sk) as any)
        .select(c => [c])
        .fetchOne(connection) as any;
}