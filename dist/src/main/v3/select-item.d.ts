import { IColumn, ColumnUtil, IAnonymousTypedColumn } from "./column";
import { ColumnMap } from "./column-map";
import { IExprSelectItem, IAnonymousTypedExprSelectItem } from "./expr-select-item";
export declare type SingleValueSelectItem = (IColumn | IExprSelectItem);
export declare type AnonymousTypedSingleValueSelectItem<TypeT> = (IAnonymousTypedColumn<TypeT> | IAnonymousTypedExprSelectItem<TypeT>);
export declare type SelectItem = (SingleValueSelectItem | ColumnMap);
export declare namespace SelectItemUtil {
    type ToColumnNameUnion<SelectItemT extends SelectItem> = (SelectItemT extends IColumn ? SelectItemT["name"] : SelectItemT extends IExprSelectItem ? SelectItemT["alias"] : SelectItemT extends ColumnMap ? ColumnUtil.Name.FromColumnMap<SelectItemT> : never);
    function isSingleValueSelectItem(raw: any): raw is SingleValueSelectItem;
    function isSelectItem(raw: any): raw is SelectItem;
}
//# sourceMappingURL=select-item.d.ts.map