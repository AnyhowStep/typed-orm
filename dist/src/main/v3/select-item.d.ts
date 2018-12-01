import { IColumn, IAnonymousTypedColumn } from "./column";
import { ColumnMap, ColumnMapUtil } from "./column-map";
import { IExprSelectItem, IAnonymousTypedExprSelectItem } from "./expr-select-item";
export declare type SingleValueSelectItem = (IColumn | IExprSelectItem);
export declare type AnonymousTypedSingleValueSelectItem<TypeT> = (IAnonymousTypedColumn<TypeT> | IAnonymousTypedExprSelectItem<TypeT>);
export declare type SelectItem = (SingleValueSelectItem | ColumnMap);
export declare namespace SelectItemUtil {
    type ToColumnNameUnion<SelectItemT extends SelectItem> = (SelectItemT extends IColumn ? SelectItemT["name"] : SelectItemT extends IExprSelectItem ? SelectItemT["alias"] : SelectItemT extends ColumnMap ? ColumnMapUtil.ToColumnNameUnion<SelectItemT> : never);
    function isSingleValueSelectItem(raw: any): raw is SingleValueSelectItem;
}
//# sourceMappingURL=select-item.d.ts.map