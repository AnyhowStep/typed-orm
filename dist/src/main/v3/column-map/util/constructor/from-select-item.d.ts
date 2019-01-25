import { ColumnMap } from "../../column-map";
import { SelectItem, SingleValueSelectItem } from "../../../select-item";
import { ColumnRef, ColumnRefUtil } from "../../../column-ref";
import { FromSingleValueSelectItem } from "./from-single-value-select-item";
export declare type FromSelectItem<SelectItemT extends SelectItem> = (SelectItemT extends SingleValueSelectItem ? FromSingleValueSelectItem<SelectItemT> : SelectItemT extends ColumnMap ? SelectItemT : SelectItemT extends ColumnRef ? {
    [columnName in ColumnRefUtil.ColumnNames<SelectItemT>]: (ColumnRefUtil.FindWithColumnName<SelectItemT, columnName>);
} : never);
export declare function fromSelectItem<SelectItemT extends SelectItem>(selectItem: SelectItemT): FromSelectItem<SelectItemT>;
