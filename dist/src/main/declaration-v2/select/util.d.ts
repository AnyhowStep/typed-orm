import * as sd from "schema-decorator";
import { AnySelect } from "./select";
import { AliasedExpr, AnyAliasedExpr, AliasedExprUtil } from "../aliased-expr";
import { ColumnCollection, ColumnCollectionUtil } from "../column-collection";
import { Column, AnyColumn, ColumnUtil } from "../column";
import { AnyJoin } from "../join";
export declare namespace SelectUtil {
    type Columns<SelectT extends any> = (SelectT extends AnyAliasedExpr ? AliasedExprUtil.ToColumn<SelectT> : SelectT extends ColumnCollection ? ColumnCollectionUtil.Columns<SelectT> : SelectT extends AnyColumn ? SelectT : never);
    type Types<SelectT extends any> = (SelectT extends AnyAliasedExpr ? ReturnType<SelectT["assertDelegate"]> : SelectT extends ColumnCollection ? ColumnCollectionUtil.Types<SelectT> : SelectT extends AnyColumn ? ReturnType<SelectT["assertDelegate"]> : never);
    type HasOneType<SelectT extends any> = (SelectT extends AnyAliasedExpr ? true : SelectT extends ColumnCollection ? ColumnCollectionUtil.HasOneType<SelectT> : SelectT extends AnyColumn ? true : false);
    type HasCompatibleTypes<SelectA extends any, SelectB extends any> = (HasOneType<SelectA> extends true ? (HasOneType<SelectB> extends true ? (Types<SelectA> extends Types<SelectB> ? true : false) : false) : (HasOneType<SelectB> extends true ? false : (keyof SelectA extends keyof SelectB ? (keyof SelectB extends keyof SelectA ? (Types<SelectA> extends Types<SelectB> ? true : false) : false) : false)));
    function hasOneType(select: AnySelect): boolean;
    function assertHasCompatibleTypes(actual: AnySelect, expected: AnySelect): void;
    type TableAlias<SelectT extends any> = (SelectT extends AnyAliasedExpr ? SelectT["tableAlias"] : SelectT extends ColumnCollection ? SelectT[keyof SelectT]["tableAlias"] : SelectT extends AnyColumn ? SelectT["tableAlias"] : never);
    type FromJoin<JoinT extends AnyJoin> = (true extends JoinT["nullable"] ? ColumnCollectionUtil.ToNullable<JoinT["columns"]> : JoinT["columns"]);
    function fromJoin<JoinT extends AnyJoin>(join: JoinT): (FromJoin<JoinT>);
    type ToColumnReferences<SelectT extends any> = (SelectT extends AnyAliasedExpr ? {
        readonly [tableAlias in SelectT["tableAlias"]]: {
            readonly [columnAlias in SelectT["alias"]]: (Column<tableAlias, columnAlias, ReturnType<SelectT["assertDelegate"]>>);
        };
    } : SelectT extends AnyColumn ? {
        readonly [tableAlias in SelectT["tableAlias"]]: {
            readonly [columnName in SelectT["name"]]: (Column<tableAlias, columnName, ReturnType<SelectT["assertDelegate"]>>);
        };
    } : SelectT extends ColumnCollection ? ColumnCollectionUtil.ToColumnReferences<SelectT> : {});
    function toColumnReferences<SelectT extends AnySelect>(select: SelectT): (ToColumnReferences<SelectT>);
    type ReplaceType<SelectT extends any, TableAliasT extends string, ColumnNameT extends string, NewTypeT> = (SelectT extends AliasedExpr<any, TableAliasT, ColumnNameT, any> ? AliasedExprUtil.WithType<SelectT, NewTypeT> : SelectT extends Column<TableAliasT, ColumnNameT, any> ? ColumnUtil.WithType<SelectT, NewTypeT> : SelectT extends ColumnCollection ? ColumnCollectionUtil.ReplaceColumnType<SelectT, TableAliasT, ColumnNameT, NewTypeT> : SelectT extends AnyAliasedExpr ? SelectT : SelectT extends AnyColumn ? SelectT : never);
    function replaceType<SelectT extends AnySelect, TableAliasT extends string, ColumnNameT extends string, NewTypeT>(select: SelectT, tableAlias: TableAliasT, columnName: ColumnNameT, newAssertDelegate: sd.AssertDelegate<NewTypeT>): (ReplaceType<SelectT, TableAliasT, ColumnNameT, NewTypeT>);
    type ToColumnWithNameOnly<SelectT extends AnySelect> = (Column<any, Columns<SelectT>["name"], any>);
    function toColumnNames<SelectT extends AnySelect>(select: SelectT): string[];
    type ToColumnCollection<TableAliasT extends string, SelectT extends any> = (SelectT extends AnyAliasedExpr ? {
        readonly [columnName in SelectT["alias"]]: (ColumnUtil.WithTableAlias<AliasedExprUtil.ToColumn<SelectT>, TableAliasT>);
    } : SelectT extends ColumnCollection ? ColumnCollectionUtil.WithTableAlias<SelectT, TableAliasT> : SelectT extends AnyColumn ? {
        readonly [columnName in SelectT["name"]]: (ColumnUtil.WithTableAlias<SelectT, TableAliasT>);
    } : never);
}
//# sourceMappingURL=util.d.ts.map