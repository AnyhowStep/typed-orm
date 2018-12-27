import {ITable} from "../../../table";
import {Insert} from "../../insert";

export function insert<TableT extends ITable & { insertAllowed : true }> (
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