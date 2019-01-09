import { ColumnMap } from "../../column-map";
import { FindWithColumnName } from "../query";
import { IColumn, ColumnUtil } from "../../../column";
import { SelectItem } from "../../../select-item";
import { SelectItemArrayUtil } from "../../../select-item-array";
import { IExprSelectItem } from "../../../expr-select-item";
import { ColumnRef, ColumnRefUtil } from "../../../column-ref";
import { ColumnNames } from "../query";
export declare type FromSelectItemArray<SelectsT extends SelectItem[], TableAliasT extends string> = (SelectsT[number] extends never ? {} : {
    readonly [columnName in SelectItemArrayUtil.ToColumnNameUnion<SelectsT>]: (columnName extends Extract<SelectsT[number], IColumn>["name"] ? ColumnUtil.WithTableAlias<ColumnUtil.FromSingleValueSelectItem<Extract<SelectsT[number], {
        name: columnName;
    }>>, TableAliasT> : columnName extends Extract<SelectsT[number], IExprSelectItem>["alias"] ? ColumnUtil.WithTableAlias<ColumnUtil.FromSingleValueSelectItem<Extract<SelectsT[number], {
        alias: columnName;
    }>>, TableAliasT> : columnName extends ColumnNames<Extract<SelectsT[number], ColumnMap>> ? ColumnUtil.WithTableAlias<FindWithColumnName<Extract<SelectsT[number], ColumnMap>, columnName>, TableAliasT> : columnName extends ColumnRefUtil.ColumnNames<Extract<SelectsT[number], ColumnRef>> ? ColumnUtil.WithTableAlias<ColumnRefUtil.FindWithColumnName<Extract<SelectsT[number], ColumnRef>, columnName>, TableAliasT> : never);
});
export declare function fromSelectItemArray<SelectsT extends SelectItem[], TableAliasT extends string>(selects: SelectsT, tableAlias: TableAliasT): FromSelectItemArray<SelectsT, TableAliasT>;
//# sourceMappingURL=from-select-item-array.d.ts.map