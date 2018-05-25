import * as sd from "schema-decorator";
import { Column, AnyColumn } from "./column";
export declare namespace ColumnUtil {
    type ToNullable<ColumnT extends AnyColumn> = (Column<ColumnT["tableAlias"], ColumnT["name"], null | ReturnType<ColumnT["assertDelegate"]>>);
    function toNullable<ColumnT extends AnyColumn>(column: ColumnT): (ToNullable<ColumnT>);
    type WithTableAlias<ColumnT extends AnyColumn, NewTableAliasT extends string> = (Column<NewTableAliasT, ColumnT["name"], ReturnType<ColumnT["assertDelegate"]>>);
    function withTableAlias<ColumnT extends AnyColumn, NewTableAliasT extends string>(column: ColumnT, newTableAlias: NewTableAliasT): (WithTableAlias<ColumnT, NewTableAliasT>);
    type WithType<ColumnT extends AnyColumn, NewTypeT> = (Column<ColumnT["tableAlias"], ColumnT["name"], NewTypeT>);
    function withType<ColumnT extends AnyColumn, NewTypeT>(column: ColumnT, assertDelegate: sd.AssertDelegate<NewTypeT>): WithType<ColumnT, NewTypeT>;
}
