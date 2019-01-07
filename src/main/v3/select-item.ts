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
        ColumnMapUtil.ColumnNames<SelectItemT> :
        SelectItemT extends ColumnRef ?
        ColumnRefUtil.ColumnNames<SelectItemT> :
        never
    );
    export function getColumnNames (item : SelectItem) : string[] {
        if (ColumnUtil.isColumn(item)) {
            return [item.name];
        } else if (ExprSelectItemUtil.isExprSelectItem(item)) {
            return [item.alias];
        } else if (ColumnMapUtil.isColumnMap(item)) {
            return ColumnMapUtil.columnNames(item);
        } else if (ColumnRefUtil.isColumnRef(item)) {
            return ColumnRefUtil.columnNames(item);
        } else {
            throw new Error("Unknown select item");
        }
    }
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
    export type TypeOf<ItemT extends SingleValueSelectItem> = (
        ItemT extends IExprSelectItem ?
        ReturnType<ItemT["assertDelegate"]> :
        ItemT extends IColumn ?
        ReturnType<ItemT["assertDelegate"]> :
        never
    );
}