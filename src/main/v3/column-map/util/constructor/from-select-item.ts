import {Writable} from "../../../type";
import {ColumnMap} from "../../column-map";
import {isColumnMap} from "../predicate";
import {ColumnUtil} from "../../../column";
import {SelectItem, SingleValueSelectItem} from "../../../select-item";
import {ExprSelectItemUtil} from "../../../expr-select-item";
import {ColumnRef, ColumnRefUtil} from "../../../column-ref";
import {fromColumn} from "./from-column";
import {FromSingleValueSelectItem, fromSingleValueSelectItem} from "./from-single-value-select-item";

//Assumes no duplicate columnName in SelectsT
export type FromSelectItem<SelectItemT extends SelectItem> = (
    SelectItemT extends SingleValueSelectItem ?
    FromSingleValueSelectItem<SelectItemT> :
    SelectItemT extends ColumnMap ?
    SelectItemT :
    SelectItemT extends ColumnRef ?
    {
        [columnName in ColumnRefUtil.ColumnNames<SelectItemT>] : (
            ColumnRefUtil.FindWithColumnName<
                SelectItemT,
                columnName
            >
        )
    } :
    never
);
//Assumes no duplicate columnName in SelectsT
export function fromSelectItem<SelectItemT extends SelectItem> (
    selectItem : SelectItemT
) : FromSelectItem<SelectItemT> {
    if (ColumnUtil.isColumn(selectItem)) {
        return fromColumn(selectItem) as any;
    } else if (ExprSelectItemUtil.isExprSelectItem(selectItem)) {
        return fromSingleValueSelectItem(selectItem) as any;
    } else if (isColumnMap(selectItem)) {
        return selectItem as any;
    } else if (ColumnRefUtil.isColumnRef(selectItem)) {
        const result : Writable<ColumnMap> = {};
        for (let tableAlias in selectItem) {
            const columnMap = selectItem[tableAlias];
            for (let columnName in columnMap) {
                const column = columnMap[columnName];
                result[column.name] = column;
            }
        }
        return result as any;
    } else {
        throw new Error(`Unknown select item`);
    }
}
