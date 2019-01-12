import {InsertSelectRowDelegate, InsertSelect, InsertSelectRow, InsertSelectModifier} from "../../insert-select";
import {QueryUtil} from "../../../query";
import {TableUtil, InsertableTable} from "../../../table";
import {ColumnRefUtil} from "../../../column-ref";

export function insertSelect<
    QueryT extends QueryUtil.AfterSelectClause,
    TableT extends InsertableTable,
    ModifierT extends InsertSelectModifier|undefined
> (
    query : QueryT,
    modifier : ModifierT,
    table : TableT,
    delegate : InsertSelectRowDelegate<QueryT, TableT>,
) : (
    InsertSelect<{
        _query : QueryT,
        _table : TableT,
        _row : InsertSelectRow<QueryT, TableT>,
        _modifier : ModifierT,
    }>
) {
    if (!table.insertAllowed) {
        throw new Error(`Cannot SELECT ... INSERT into table ${table.alias}`);
    }

    const ref = ColumnRefUtil.fromSelectItemArray(query._selects);
    const row = delegate(ColumnRefUtil.toConvenient(ref) as any);

    for (let columnName of TableUtil.requiredColumnNames(table)) {
        if (!(columnName in row)) {
            throw new Error(`A value for ${table.alias}.${columnName} is required`);
        }
    }

    return new InsertSelect({
        _query : query,
        _table : table,
        _row : row,
        _modifier : modifier,
    });
}