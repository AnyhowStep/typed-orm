import {InsertSelectRowDelegate, InsertSelect, InsertSelectRow, InsertSelectUtil, InsertSelectModifier} from "../../../../insert-select";
import {AfterSelectClause} from "../../predicate";
import {ITable} from "../../../../table";

export type ReplaceInto<
    QueryT extends AfterSelectClause,
    TableT extends ITable & { insertAllowed : true }
> = (
    InsertSelect<{
        _query : QueryT,
        _table : TableT,
        _row : InsertSelectRow<QueryT, TableT>,
        _modifier : InsertSelectModifier.REPLACE,
    }>
);
export function replaceInto<
    QueryT extends AfterSelectClause,
    TableT extends ITable & { insertAllowed : true }
> (
    query : QueryT,
    table : TableT,
    delegate : InsertSelectRowDelegate<QueryT, TableT>
) : (
    ReplaceInto<QueryT, TableT>
) {
    return InsertSelectUtil.insertSelect(query, InsertSelectModifier.REPLACE, table, delegate);
}