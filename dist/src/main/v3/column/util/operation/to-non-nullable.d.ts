import * as sd from "type-mapping";
import { IColumn, Column } from "../../column";
/**
 * Used to implement narrowing
 */
export declare type ToNonNullable<ColumnT extends IColumn> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: sd.SafeMapper<Exclude<ReturnType<ColumnT["assertDelegate"]>, null>>;
}> : never);
export declare function toNonNullable<ColumnT extends IColumn>({ tableAlias, name, assertDelegate, __isFromExprSelectItem, }: ColumnT): (ToNonNullable<ColumnT>);
