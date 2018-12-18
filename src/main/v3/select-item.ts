import {IColumn, ColumnUtil, IAnonymousTypedColumn} from "./column";
import {ColumnMap, ColumnMapUtil} from "./column-map";
import {IExprSelectItem, IAnonymousTypedExprSelectItem, ExprSelectItemUtil} from "./expr-select-item";
import {ColumnRef, ColumnRefUtil} from "./column-ref";

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
    ColumnMap |
    ColumnRef
);

export namespace SelectItemUtil {
    export type ToColumnNameUnion<SelectItemT extends SelectItem> = (
        SelectItemT extends IColumn ?
        SelectItemT["name"] :
        SelectItemT extends IExprSelectItem ?
        SelectItemT["alias"] :
        SelectItemT extends ColumnMap ?
        ColumnUtil.Name.FromColumnMap<SelectItemT> :
        SelectItemT extends ColumnRef ?
        ColumnUtil.Name.FromColumnRef<SelectItemT> :
        never
    );
    export function isSingleValueSelectItem (raw : any) : raw is SingleValueSelectItem {
        return (
            ColumnUtil.isColumn(raw) ||
            ExprSelectItemUtil.isExprSelectItem(raw)
        );
    }
    export function isSelectItem (raw : any) : raw is SelectItem {
        if (isSingleValueSelectItem(raw)) {
            return true;
        } else {
            return ColumnMapUtil.isColumnMap(raw) || ColumnRefUtil.isColumnRef(raw);
        }
    }
}