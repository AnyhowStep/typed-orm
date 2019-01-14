import {InsertableTable} from "../../../../table";
import {IConnection} from "../../../../execution";
import {IInsert, InsertRow, InsertModifier} from "../../../insert";
import {Execute, execute} from "../execute";
import {insertIgnoreInto} from "../../constructor";

export type InsertIgnoreResult<TableT extends InsertableTable> = (
    Execute<IInsert<{
        _table : TableT,
        _values : InsertRow<TableT>[],
        _modifier : InsertModifier.IGNORE,
    }>>
);
export async function insertIgnore<
    TableT extends InsertableTable
> (
    connection : IConnection,
    table : TableT,
    insertRow : InsertRow<TableT>
) : (
    Promise<InsertIgnoreResult<TableT>>
) {
    return execute(
        insertIgnoreInto<TableT>(table)
            .values(insertRow),
        connection
    );
}