import * as sd from "type-mapping";
import { IColumn, Column } from "../../column";
export declare type WithType<ColumnT extends IColumn, NewAssertFuncT extends sd.AnySafeMapper> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: sd.SafeMapper<sd.OutputOf<NewAssertFuncT>>;
}> : never);
export declare function withType<ColumnT extends IColumn, NewAssertFuncT extends sd.AnySafeMapper>({ tableAlias, name, __isFromExprSelectItem, }: ColumnT, newAssertFunc: NewAssertFuncT): (WithType<ColumnT, NewAssertFuncT>);
