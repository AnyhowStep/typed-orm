import {ITable} from "../../table";
import {AliasedTable} from "../../../aliased-table";
import {ColumnMapUtil} from "../../../column-map";

export type As<TableT extends ITable, NewAliasT extends string> = (
    AliasedTable<{
        readonly usedRef : TableT["usedRef"];
        readonly alias : NewAliasT;
        readonly columns : ColumnMapUtil.WithTableAlias<
            TableT["columns"],
            NewAliasT
        >;
    }>
);
export function as<TableT extends ITable, NewAliasT extends string> (
    {
        usedRef,
        columns,
        unaliasedQuery,
    } : TableT,
    newAlias : NewAliasT
) : (
    As<TableT, NewAliasT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns2 : TableT["columns"] = columns;
    return new AliasedTable(
        {
            usedRef : usedRef,
            alias : newAlias,
            columns : ColumnMapUtil.withTableAlias(
                columns2,
                newAlias
            ),
        },
        {unaliasedQuery}
    );
}