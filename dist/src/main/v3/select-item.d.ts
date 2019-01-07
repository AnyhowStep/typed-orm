import { IColumn, IAnonymousTypedColumn } from "./column";
import { ColumnMap, ColumnMapUtil } from "./column-map";
import { IExprSelectItem, IAnonymousTypedExprSelectItem } from "./expr-select-item";
import { ColumnRef, ColumnRefUtil } from "./column-ref";
export declare type SingleValueSelectItem = (IColumn | IExprSelectItem);
export declare type AnonymousTypedSingleValueSelectItem<TypeT> = (IAnonymousTypedColumn<TypeT> | IAnonymousTypedExprSelectItem<TypeT>);
export declare type SelectItem = (SingleValueSelectItem | ColumnMap | ColumnRef);
export declare namespace SelectItemUtil {
    type ToColumnNameUnion<SelectItemT extends SelectItem> = (SelectItemT extends IColumn ? SelectItemT["name"] : SelectItemT extends IExprSelectItem ? SelectItemT["alias"] : SelectItemT extends ColumnMap ? ColumnMapUtil.ColumnNames<SelectItemT> : SelectItemT extends ColumnRef ? ColumnRefUtil.ColumnNames<SelectItemT> : never);
    function getColumnNames(item: SelectItem): string[];
    function isSingleValueSelectItem(raw: any): raw is SingleValueSelectItem;
    function isSelectItem(raw: any): raw is SelectItem;
    type TypeOf<ItemT extends SingleValueSelectItem> = (ItemT extends IExprSelectItem ? ReturnType<ItemT["assertDelegate"]> : ItemT extends IColumn ? ReturnType<ItemT["assertDelegate"]> : never);
}
//# sourceMappingURL=select-item.d.ts.map