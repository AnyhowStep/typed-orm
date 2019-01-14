import {TableWithPk, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {PrimaryKey} from "../../../../primary-key";

export function assertExistsByPk<
    TableT extends TableWithPk
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : (
    Promise<void>
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .assertExists(connection) as any;
}