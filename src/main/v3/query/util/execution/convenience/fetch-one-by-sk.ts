import {ITable, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {SuperKey} from "../../../../super-key";

export function fetchOneBySk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    sk : SuperKey<TableT>
) : Promise<Row<TableT>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqSuperKey(table, sk) as any)
        .select(c => [c])
        .fetchOne(connection) as any;
}