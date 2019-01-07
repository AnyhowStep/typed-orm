import * as sd from "schema-decorator";
import { IColumn, Column } from "../../column";
export declare type WithType<ColumnT extends IColumn, NewAssertDelegateT extends sd.AnyAssertFunc> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: sd.ToAssertDelegate<NewAssertDelegateT>;
}> : never);
export declare function withType<ColumnT extends IColumn, NewAssertFuncT extends sd.AnyAssertFunc>({ tableAlias, name, __subTableName, __isInSelectClause, }: ColumnT, newAssertFunc: NewAssertFuncT): (WithType<ColumnT, NewAssertFuncT>);
//# sourceMappingURL=with-type.d.ts.map