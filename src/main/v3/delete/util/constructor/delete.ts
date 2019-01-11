import {DeletableQuery, Delete, DeleteModifier} from "../../delete";
import {DeletableTable} from "../../../table";
import {NonEmptyTuple} from "../../../tuple";
import {QueryUtil} from "../../../query";

export type DeletableTableMap<
    QueryT extends DeletableQuery
> = (
    {
        [tableAlias in QueryUtil.DeletableTables<QueryT>["alias"]] : (
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
    ) => NonEmptyTuple<{ alias : QueryUtil.DeletableTables<QueryT>["alias"] }>
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
        _tables : DeletableTable[],
        _modifier : ModifierT,
    }>
) {
    const options = QueryUtil.deletableTableArray(query);
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
    const tables : DeletableTable[] = [];
    const alreadySeen = new Set<string>();
    for (let s of selected) {
        if (alreadySeen.has(s.alias)) {
            continue;
        }
        alreadySeen.add(s.alias);
        const table = options.find(o => o.alias == s.alias);
        if (table == undefined) {
            throw new Error(`Cannot delete from table ${s.alias}`);
        }
        if (!table.deleteAllowed) {
            throw new Error(`Cannot delete from table ${s.alias}; explicitly not allowed`);
        }
        tables.push(table);
    }
    return new Delete({
        _query : query,
        _tables : tables,
        _modifier : modifier,
    });
}
export {del as delete};