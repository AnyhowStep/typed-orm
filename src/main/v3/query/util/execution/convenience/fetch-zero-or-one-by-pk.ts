import {TableWithPk, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {PrimaryKey} from "../../../../primary-key";

export function fetchZeroOrOneByPk<
    TableT extends TableWithPk
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : Promise<Row<TableT>|undefined> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .select(c => [c])
        .fetchZeroOrOne(connection) as any;
}