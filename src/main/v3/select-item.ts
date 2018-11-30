import {IColumn, Column, IAnonymousTypedColumn} from "./column";
import {ColumnMap, ColumnMapUtil} from "./column-map";
import {IExprSelectItem, IAnonymousTypedExprSelectItem} from "./expr-select-item";

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
    //TODO Better name
    //Basically, only tableAlias and name, so we can check for duplicates.
    export type ToColumnIdentifierUnion<SelectItemT extends SelectItem> = (
        SelectItemT extends IColumn ?
        Column.ToColumnIdentifier<SelectItemT> :
        SelectItemT extends IExprSelectItem ?
        {
            readonly tableAlias : SelectItemT["tableAlias"],
            readonly name : SelectItemT["alias"],
        } :
        SelectItemT extends ColumnMap ?
        ColumnMapUtil.ToColumnIdentifierUnion<SelectItemT> :
        never
    );
}