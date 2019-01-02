import { DeletableQuery, Delete, DeleteModifier } from "../../delete";
import { ITable, TableUtil } from "../../../table";
import { NonEmptyTuple } from "../../../tuple";

export type DeletableTable<
    QueryT extends DeletableQuery
> = (
    Extract<
        QueryT["_joins"][number]["aliasedTable"],
        ITable & { deleteAllowed : true }
    >
);
export function deletableTableArray<
    QueryT extends DeletableQuery
> (
    query : QueryT
) : DeletableTable<QueryT>[] {
    const result : DeletableTable<QueryT>[] = [];
    for (let join of query._joins) {
        if (TableUtil.isTable(join.aliasedTable) && join.aliasedTable.deleteAllowed) {
            result.push(join.aliasedTable as any);
        }
    }
    return result as DeletableTable<QueryT>[];
}
export type DeletableTableMap<
    QueryT extends DeletableQuery
> = (
    {
        [tableAlias in DeletableTable<QueryT>["alias"]] : (
            {
                alias : tableAlias,
            }
        )
    }
);
export type DeleteDelegate<
    QueryT extends DeletableQuery
> = (
    (
        tables : DeletableTableMap<QueryT>
    ) => NonEmptyTuple<{ alias : DeletableTable<QueryT>["alias"] }>
);

function del<
    QueryT extends DeletableQuery,
    ModifierT extends DeleteModifier|undefined
> (
    query : QueryT,
    modifier : ModifierT,
    delegate : DeleteDelegate<QueryT>
) : (
    Delete<{
        _query : DeletableQuery,
        _tables : (ITable & { deleteAllowed : true })[],
        _modifier : ModifierT,
    }>
) {
    const options = deletableTableArray(query);
    const selected = delegate(options.reduce<DeletableTableMap<QueryT>>(
        (memo, table) => {
            (memo as any)[table.alias] = table;
            return memo;
        },
        {} as any
    ));
    if (selected.length == 0) {
        throw new Error(`Cannot delete from zero tables`);
    }
    const tables = selected.map(s => {
        const table = options.find(o => o.alias == s.alias);
        if (table == undefined) {
            throw new Error(`Cannot delete from table ${s.alias}`);
        }
        if (!table.deleteAllowed) {
            throw new Error(`Cannot delete from table ${s.alias}; explicitly not allowed`);
        }
        return table;
    });
    return new Delete({
        _query : query,
        _tables : tables,
        _modifier : modifier,
    });
}
export {del as delete};