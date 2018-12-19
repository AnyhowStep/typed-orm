import { IColumn, ColumnUtil, IAnonymousTypedColumn } from "./column";
import { ColumnMap } from "./column-map";
import { IExprSelectItem, IAnonymousTypedExprSelectItem } from "./expr-select-item";
import { ColumnRef } from "./column-ref";
export declare type SingleValueSelectItem = (IColumn | IExprSelectItem);
export declare type AnonymousTypedSingleValueSelectItem<TypeT> = (IAnonymousTypedColumn<TypeT> | IAnonymousTypedExprSelectItem<TypeT>);
export declare type SelectItem = (SingleValueSelectItem | ColumnMap | ColumnRef);
export declare namespace SelectItemUtil {
    type ToColumnNameUnion<SelectItemT extends SelectItem> = (SelectItemT extends IColumn ? SelectItemT["name"] : SelectItemT extends IExprSelectItem ? SelectItemT["alias"] : SelectItemT extends ColumnMap ? ColumnUtil.Name.FromColumnMap<SelectItemT> : SelectItemT extends ColumnRef ? ColumnUtil.Name.FromColumnRef<SelectItemT> : never);
    function isSingleValueSelectItem(raw: any): raw is SingleValueSelectItem;
    function isSelectItem(raw: any): raw is SelectItem;
    type TypeOf<ItemT extends SingleValueSelectItem> = (ItemT extends IExprSelectItem ? ReturnType<ItemT["assertDelegate"]> : ItemT extends IColumn ? ReturnType<ItemT["assertDelegate"]> : never);
}
//# sourceMappingURL=select-item.d.ts.map