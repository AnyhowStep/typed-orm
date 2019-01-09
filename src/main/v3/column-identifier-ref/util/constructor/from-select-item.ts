import {ColumnIdentifierRef} from "../../column-identifier-ref";
import {IColumn, ColumnUtil} from "../../../column";
import {IExprSelectItem, ExprSelectItemUtil} from "../../../expr-select-item";
import {ColumnMap, ColumnMapUtil} from "../../../column-map";
import {SelectItem} from "../../../select-item";
import {ColumnRef, ColumnRefUtil} from "../../../column-ref";
import {Writable} from  "../../../type";
import {FromColumn, appendColumn} from "./from-column";
import {FromExprSelectItem, appendExprSelectItem} from "./from-expr-select-item";
import {FromColumnMap, appendColumnMap} from "./from-column-map";
import {FromColumnRef, appendColumnRef} from "./from-column-ref";

export type FromSelectItem<SelectItemT extends SelectItem> = (
    SelectItemT extends IColumn ?
    FromColumn<SelectItemT> :
    SelectItemT extends IExprSelectItem ?
    FromExprSelectItem<SelectItemT> :
    SelectItemT extends ColumnMap ?
    FromColumnMap<SelectItemT> :
    SelectItemT extends ColumnRef ?
    FromColumnRef<SelectItemT> :
    never
);
export function appendSelectItem (
    ref : Writable<ColumnIdentifierRef>,
    item : SelectItem
) {
    if (ColumnUtil.isColumn(item)) {
        appendColumn(ref, item);
    } else if (ExprSelectItemUtil.isExprSelectItem(item)) {
        appendExprSelectItem(ref, item);
    } else if (ColumnMapUtil.isColumnMap(item)) {
        appendColumnMap(ref, item);
    } else if (ColumnRefUtil.isColumnRef(item)) {
        appendColumnRef(ref, item);
    } else {
        throw new Error(`Unknown select item`);
    }
    return ref;
}