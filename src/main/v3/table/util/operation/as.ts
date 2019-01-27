import {ITable} from "../../table";
import {AliasedTable} from "../../../aliased-table";
import {ColumnMapUtil} from "../../../column-map";

export type As<TableT extends ITable, NewAliasT extends string> = (
    AliasedTable<{
        readonly usedColumns : TableT["usedColumns"];
        readonly alias : NewAliasT;
        readonly columns : ColumnMapUtil.WithTableAlias<
            TableT["columns"],
            NewAliasT
        >;
    }>
);
export function as<TableT extends ITable, NewAliasT extends string> (
    {
        usedColumns,
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
            usedColumns,
            alias : newAlias,
            columns : ColumnMapUtil.withTableAlias(
                columns2,
                newAlias
            ),
        },
        {unaliasedQuery}
    );
}