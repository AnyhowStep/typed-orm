import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {Key} from "../../../../key";
import {PrimaryKey} from "../../../../primary-key";

export function existsByPk<
    TableT extends ITable & { primaryKey : Key }
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : (
    Promise<boolean>
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .exists(connection) as any;
}