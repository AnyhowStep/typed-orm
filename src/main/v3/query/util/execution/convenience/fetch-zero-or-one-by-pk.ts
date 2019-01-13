import {ITable, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {Key} from "../../../../key";
import {PrimaryKey} from "../../../../primary-key";

export function fetchZeroOrOneByPk<
    TableT extends ITable & { primaryKey : Key }
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : Promise<Row<TableT>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .select(c => [c])
        .fetchZeroOrOne(connection) as any;
}