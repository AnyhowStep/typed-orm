import {Column} from "../../column";
import {IExprSelectItem} from "../../../expr-select-item";

export type FromExprSelectItem<ItemT extends IExprSelectItem> = (
    Column<{
        readonly tableAlias : ItemT["tableAlias"],
        readonly name : ItemT["alias"],
        readonly assertDelegate : ItemT["assertDelegate"],
    }>
);
//TODO-UNHACK Find some way to not need this hack
export function fromExprSelectItem<ItemT extends IExprSelectItem> (
    item : ItemT
) : FromExprSelectItem<ItemT> {
    return new Column(
        {
            tableAlias : item.tableAlias,
            name : item.alias,
            assertDelegate : item.assertDelegate,
        },
        undefined,
        //TODO-UNHACK Find some way to not need this hack
        true
    );
}