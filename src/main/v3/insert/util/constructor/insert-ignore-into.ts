import {ITable} from "../../../table";
import {Insert, InsertModifier} from "../../insert";

export function insertIgnoreInto<TableT extends ITable & { insertAllowed : true }> (
    table : TableT
) : (
    Insert<{
        _table : TableT,
        _values : undefined,
        _modifier : InsertModifier.IGNORE,
    }>
) {
    return new Insert({
        _table  : table,
        _values : undefined,
        _modifier : InsertModifier.IGNORE,
    });
}