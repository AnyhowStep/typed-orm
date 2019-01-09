import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {IExprSelectItem} from "../../../expr-select-item";
import {ColumnIdentifierUtil} from "../../../column-identifier";
import {ColumnIdentifierRef} from "../../column-identifier-ref";
import {Writable} from  "../../../type";

export type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (
    ExprSelectItemT extends IExprSelectItem ?
    {
        readonly [tableAlias in ExprSelectItemT["tableAlias"]] : (
            ColumnIdentifierMapUtil.FromExprSelectItem<ExprSelectItemT>
        )
    } :
    never
);
export function appendExprSelectItem (
    ref : Writable<ColumnIdentifierRef>,
    item : IExprSelectItem
) {
    let map = ref[item.tableAlias];
    if (map == undefined) {
        map = {};
        ref[item.tableAlias] = map;
    }
    map[item.alias] = ColumnIdentifierUtil.fromExprSelectItem(item);
    return ref;
}