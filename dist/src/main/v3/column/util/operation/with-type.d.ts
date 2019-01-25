import * as sd from "schema-decorator";
import { IColumn, Column } from "../../column";
export declare type WithType<ColumnT extends IColumn, NewAssertFuncT extends sd.AnyAssertFunc> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: sd.AssertDelegate<sd.TypeOf<NewAssertFuncT>>;
}> : never);
export declare function withType<ColumnT extends IColumn, NewAssertFuncT extends sd.AnyAssertFunc>({ tableAlias, name, __isFromExprSelectItem, }: ColumnT, newAssertFunc: NewAssertFuncT): (WithType<ColumnT, NewAssertFuncT>);
//# sourceMappingURL=with-type.d.ts.map