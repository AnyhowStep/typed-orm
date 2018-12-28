import {InsertSelectRowDelegate, InsertSelect, InsertSelectRow, InsertSelectUtil} from "../../../../insert-select";
import {AfterSelectClause} from "../../predicate";
import {ITable} from "../../../../table";

export type InsertInto<
    QueryT extends AfterSelectClause,
    TableT extends ITable & { insertAllowed : true }
> = (
    InsertSelect<{
        _query : QueryT,
        _table : TableT,
        _row : InsertSelectRow<QueryT, TableT>,
        _modifier : undefined,
    }>
);
export function insertInto<
    QueryT extends AfterSelectClause,
    TableT extends ITable & { insertAllowed : true }
> (
    query : QueryT,
    table : TableT,
    delegate : InsertSelectRowDelegate<QueryT, TableT>
) : (
    InsertInto<QueryT, TableT>
) {
    return InsertSelectUtil.insertSelect(query, undefined, table, delegate);
}