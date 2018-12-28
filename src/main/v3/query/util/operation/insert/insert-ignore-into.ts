import {InsertSelectRowDelegate, InsertSelect, InsertSelectRow, InsertSelectUtil, InsertSelectModifier} from "../../../../insert-select";
import {AfterSelectClause} from "../../predicate";
import {ITable} from "../../../../table";

export type InsertIgnoreInto<
    QueryT extends AfterSelectClause,
    TableT extends ITable & { insertAllowed : true }
> = (
    InsertSelect<{
        _query : QueryT,
        _table : TableT,
        _row : InsertSelectRow<QueryT, TableT>,
        _modifier : InsertSelectModifier.IGNORE,
    }>
);
export function insertIgnoreInto<
    QueryT extends AfterSelectClause,
    TableT extends ITable & { insertAllowed : true }
> (
    query : QueryT,
    table : TableT,
    delegate : InsertSelectRowDelegate<QueryT, TableT>
) : (
    InsertIgnoreInto<QueryT, TableT>
) {
    return InsertSelectUtil.insertSelect(query, InsertSelectModifier.IGNORE, table, delegate);
}