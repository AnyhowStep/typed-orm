import * as sd from "schema-decorator";
import { ColumnMap } from "../column-map";
import { ToNullable } from "./operation";
import { FindWithColumnName } from "./query";
import { IColumn, Column, ColumnUtil } from "../../column";
import { IJoin } from "../../join";
import { SelectItem, SingleValueSelectItem } from "../../select-item";
import { SelectItemArrayUtil } from "../../select-item-array";
import { IExprSelectItem } from "../../expr-select-item";
import { AssertMap } from "../../assert-map";
import { ColumnRef, ColumnRefUtil } from "../../column-ref";
export declare type FromFieldArray<TableAliasT extends string, FieldsT extends sd.AnyField[]> = (FieldsT[number] extends never ? {} : {
    readonly [columnName in FieldsT[number]["name"]]: (Column<{
        tableAlias: TableAliasT;
        name: columnName;
        assertDelegate: Extract<FieldsT[number], {
            name: columnName;
        }>["assertDelegate"];
    }>);
});
export declare function fromFieldArray<TableAliasT extends string, FieldsT extends sd.AnyField[]>(tableAlias: TableAliasT, fields: FieldsT): (FromFieldArray<TableAliasT, FieldsT>);
export declare type FromAssertMap<TableAliasT extends string, AssertMapT extends AssertMap> = ({
    readonly [columnName in Extract<keyof AssertMapT, string>]: (Column<{
        tableAlias: TableAliasT;
        name: columnName;
        assertDelegate: sd.ToAssertDelegate<AssertMapT[columnName]>;
    }>);
});
export declare function fromAssertMap<TableAliasT extends string, AssertMapT extends {
    readonly [columnName: string]: sd.AnyAssertFunc;
}>(tableAlias: TableAliasT, assertMap: AssertMapT): (FromAssertMap<TableAliasT, AssertMapT>);
export declare type FromJoin<JoinT extends IJoin> = (JoinT extends IJoin ? (true extends JoinT["nullable"] ? ToNullable<JoinT["columns"]> : JoinT["columns"]) : never);
export declare function fromJoin<JoinT extends IJoin>(join: JoinT): FromJoin<JoinT>;
export declare type FromColumn<ColumnT extends IColumn> = (ColumnT extends IColumn ? {
    readonly [columnName in ColumnT["name"]]: ColumnT;
} : never);
export declare function fromColumn<ColumnT extends IColumn>(column: ColumnT): FromColumn<ColumnT>;
export declare type FromSingleValueSelectItem<SelectItemT extends SingleValueSelectItem> = (FromColumn<ColumnUtil.FromSingleValueSelectItem<SelectItemT>>);
export declare function fromSingleValueSelectItem<SelectItemT extends SingleValueSelectItem>(selectItem: SelectItemT): (FromSingleValueSelectItem<SelectItemT>);
export declare type FromSelectItem<SelectItemT extends SelectItem> = (SelectItemT extends SingleValueSelectItem ? FromSingleValueSelectItem<SelectItemT> : SelectItemT extends ColumnMap ? SelectItemT : SelectItemT extends ColumnRef ? {
    [columnName in ColumnUtil.Name.FromColumnRef<SelectItemT>]: (ColumnRefUtil.FindWithColumnName<SelectItemT, columnName>);
} : never);
export declare function fromSelectItem<SelectItemT extends SelectItem>(selectItem: SelectItemT): FromSelectItem<SelectItemT>;
export declare type FromSelectItemArray<SelectsT extends SelectItem[], TableAliasT extends string> = (SelectsT[number] extends never ? {} : {
    readonly [columnName in SelectItemArrayUtil.ToColumnNameUnion<SelectsT>]: (columnName extends Extract<SelectsT[number], IColumn>["name"] ? ColumnUtil.WithTableAlias<ColumnUtil.FromSingleValueSelectItem<Extract<SelectsT[number], {
        name: columnName;
    }>>, TableAliasT> : columnName extends Extract<SelectsT[number], IExprSelectItem>["alias"] ? ColumnUtil.WithTableAlias<ColumnUtil.FromSingleValueSelectItem<Extract<SelectsT[number], {
        alias: columnName;
    }>>, TableAliasT> : columnName extends ColumnUtil.Name.FromColumnMap<Extract<SelectsT[number], ColumnMap>> ? ColumnUtil.WithTableAlias<FindWithColumnName<Extract<SelectsT[number], ColumnMap>, columnName>, TableAliasT> : columnName extends ColumnUtil.Name.FromColumnRef<Extract<SelectsT[number], ColumnRef>> ? ColumnUtil.WithTableAlias<ColumnRefUtil.FindWithColumnName<Extract<SelectsT[number], ColumnRef>, columnName>, TableAliasT> : never);
});
export declare function fromSelectItemArray<SelectsT extends SelectItem[], TableAliasT extends string>(selects: SelectsT, tableAlias: TableAliasT): FromSelectItemArray<SelectsT, TableAliasT>;
export declare type FromColumnArray<ColumnsT extends IColumn[]> = ({
    readonly [columnName in ColumnsT[number]["name"]]: (Extract<ColumnsT[number], {
        name: columnName;
    }>);
});
export declare function fromColumnArray<ColumnsT extends IColumn[]>(columns: ColumnsT): FromColumnArray<ColumnsT>;
//# sourceMappingURL=constructor.d.ts.map