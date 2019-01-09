import * as Ctor from "../../constructor";
import {ColumnUtil} from "../../../../column";
import {ExprSelectItemUtil} from "../../../../expr-select-item";
import {ColumnMapUtil} from "../../../../column-map";
import {SelectItem} from "../../../../select-item";
import {ColumnRefUtil} from "../../../../column-ref";
import {fromColumnMap} from "./from-column-map";
import {fromColumnRef} from "./from-column-ref";

export type FromSelectItem<SelectItemT extends SelectItem> = (
    Ctor.FromSelectItem<SelectItemT>[]
);
export function fromSelectItem<SelectItemT extends SelectItem> (
    selectItem : SelectItemT
) : FromSelectItem<SelectItemT> {
    if (ColumnUtil.isColumn(selectItem)) {
        return [Ctor.fromColumn(selectItem)] as any;
    } else if (ExprSelectItemUtil.isExprSelectItem(selectItem)) {
        return [Ctor.fromExprSelectItem(selectItem)] as any;
    } else if (ColumnMapUtil.isColumnMap(selectItem)) {
        return fromColumnMap(selectItem) as any;
    } else if (ColumnRefUtil.isColumnRef(selectItem)) {
        return fromColumnRef(selectItem) as any;
    } else {
        throw new Error(`Unknown select item`);
    }
}