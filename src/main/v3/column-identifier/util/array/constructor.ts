import {ColumnIdentifier} from "../../column-identifier";
import * as Ctor from "../constructor";
import {ColumnUtil} from "../../../column";
import {ExprSelectItemUtil} from "../../../expr-select-item";
import {ColumnMap, ColumnMapUtil} from "../../../column-map";
import {SelectItem} from "../../../select-item";

export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    Ctor.FromColumnMap<ColumnMapT>[]
);
export function fromColumnMap<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : FromColumnMap<ColumnMapT> {
    const result : ColumnIdentifier[] = [];
    for (let columnName in columnMap) {
        result.push(Ctor.fromColumn(
            columnMap[columnName]
        ));
    }
    return result as FromColumnMap<ColumnMapT>;
}
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
    } else {
        throw new Error(`Unknown select item`);
    }
}
export type FromSelectItemArrayIgnoreIndex<
    SelectsT extends SelectItem[],
    IgnoreIndexT extends Extract<keyof SelectsT, string>
> = (
    {
        [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>] : (
            SelectsT[index] extends SelectItem ?
            FromSelectItem<SelectsT[index]> :
            never
        )
    }[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]
);