import {InsertableTable} from "../../../table";
import {Insert} from "../../insert";

export function insertInto<TableT extends InsertableTable> (
    table : TableT
) : (
    Insert<{
        _table : TableT,
        _values : undefined,
        _modifier : undefined,
    }>
) {
    return new Insert({
        _table  : table,
        _values : undefined,
        _modifier : undefined,
    });
}