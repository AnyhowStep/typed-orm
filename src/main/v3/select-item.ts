import {IColumn, Column, IAnonymousTypedColumn} from "./column";
import {ColumnMap, ColumnMapUtil} from "./column-map";
import {IExprSelectItem, IAnonymousTypedExprSelectItem, ExprSelectItemUtil} from "./expr-select-item";

export type SingleValueSelectItem = (
    IColumn |
    IExprSelectItem
);

export type AnonymousTypedSingleValueSelectItem<TypeT> = (
    IAnonymousTypedColumn<TypeT> |
    IAnonymousTypedExprSelectItem<TypeT>
);

export type SelectItem = (
    SingleValueSelectItem |
    ColumnMap
);

export namespace SelectItemUtil {
    export type ToColumnNameUnion<SelectItemT extends SelectItem> = (
        SelectItemT extends IColumn ?
        SelectItemT["name"] :
        SelectItemT extends IExprSelectItem ?
        SelectItemT["alias"] :
        SelectItemT extends ColumnMap ?
        ColumnMapUtil.ToColumnNameUnion<SelectItemT> :
        never
    );
    export function isSingleValueSelectItem (raw : any) : raw is SingleValueSelectItem {
        return (
            Column.isColumn(raw) ||
            ExprSelectItemUtil.isExprSelectItem(raw)
        );
    }
}