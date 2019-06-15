import * as sd from "type-mapping";
import { IColumn, Column } from "../../column";
export declare type ToNullable<ColumnT extends IColumn> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: sd.SafeMapper<null | ReturnType<ColumnT["assertDelegate"]>>;
}> : never);
export declare function toNullable<ColumnT extends IColumn>({ tableAlias, name, assertDelegate, __isFromExprSelectItem, }: ColumnT): (ToNullable<ColumnT>);
