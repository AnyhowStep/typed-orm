import { ColumnMap } from "../../column-map";
import { ColumnUtil } from "../../../column";
export declare type WithTableAlias<ColumnMapT extends ColumnMap, NewTableAliasT extends string> = ({
    readonly [columnName in Extract<keyof ColumnMapT, string>]: (ColumnUtil.WithTableAlias<ColumnMapT[columnName], NewTableAliasT>);
});
export declare function withTableAlias<ColumnMapT extends ColumnMap, NewTableAliasT extends string>(columnMap: ColumnMapT, newTableAlias: NewTableAliasT): (WithTableAlias<ColumnMapT, NewTableAliasT>);
//# sourceMappingURL=with-table-alias.d.ts.map