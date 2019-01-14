import {InsertableTable} from "../../../../table";
import {IConnection} from "../../../../execution";
import {IInsert, InsertRow, InsertModifier} from "../../../insert";
import {Execute, execute} from "../execute";
import {replaceInto} from "../../constructor";

export type ReplaceResult<TableT extends InsertableTable> = (
    Execute<IInsert<{
        _table : TableT,
        _values : InsertRow<TableT>[],
        _modifier : InsertModifier.REPLACE,
    }>>
);
export async function replace<
    TableT extends InsertableTable
> (
    connection : IConnection,
    table : TableT,
    insertRow : InsertRow<TableT>
) : (
    Promise<ReplaceResult<TableT>>
) {
    return execute(
        replaceInto<TableT>(table)
            .values(insertRow),
        connection
    );
}