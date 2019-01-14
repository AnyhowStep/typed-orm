import {InsertableTable} from "../../../../table";
import {IConnection} from "../../../../execution";
import {IInsert, InsertRow} from "../../../insert";
import {Execute, execute} from "../execute";
import {insertInto} from "../../constructor";

export type InsertResult<TableT extends InsertableTable> = (
    Execute<IInsert<{
        _table : TableT,
        _values : InsertRow<TableT>[],
        _modifier : undefined,
    }>>
);
export async function insert<
    TableT extends InsertableTable
> (
    connection : IConnection,
    table : TableT,
    insertRow : InsertRow<TableT>
) : (
    Promise<InsertResult<TableT>>
) {
    return execute(
        insertInto<TableT>(table)
            .values(insertRow),
        connection
    );
}