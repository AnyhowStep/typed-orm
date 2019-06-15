import {ColumnMap, WritableColumnMap} from "../../column-map";
import {ColumnUtil} from "../../../column";

export type WithTableAlias<
    ColumnMapT extends ColumnMap,
    NewTableAliasT extends string
> = (
    {
        readonly [columnName in Extract<keyof ColumnMapT, string>] : (
            ColumnUtil.WithTableAlias<
                ColumnMapT[columnName],
                NewTableAliasT
            >
        )
    }
);
export function withTableAlias<
    ColumnMapT extends ColumnMap,
    NewTableAliasT extends string
> (
    columnMap : ColumnMapT,
    newTableAlias : NewTableAliasT
) : (
    WithTableAlias<ColumnMapT, NewTableAliasT>
) {
    const result : WritableColumnMap = {};
    for (let columnName in columnMap) {
        result[columnName] = ColumnUtil.withTableAlias(
            columnMap[columnName],
            newTableAlias
        );
    }
    return result as WithTableAlias<ColumnMapT, NewTableAliasT>;
}