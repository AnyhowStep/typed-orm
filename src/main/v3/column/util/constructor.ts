import {IColumn, Column} from "../column";
import {isColumn} from "./predicate";
import {SingleValueSelectItem} from "../../select-item";
import {IExprSelectItem, ExprSelectItemUtil} from "../../expr-select-item";
import {ColumnMap} from "../../column-map";
import {IJoin} from "../../join";
import {ColumnMapUtil} from "../../column-map";
import {ColumnRef} from "../../column-ref";

export type FromExprSelectItem<ItemT extends IExprSelectItem> = (
    Column<{
        readonly tableAlias : ItemT["tableAlias"],
        readonly name : ItemT["alias"],
        readonly assertDelegate : ItemT["assertDelegate"],
    }>
);
//TODO Find some way to not need this hack
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
        //TODO Find some way to not need this hack
        true
    );
}
export type FromSingleValueSelectItem<ItemT extends SingleValueSelectItem> = (
    ItemT extends IColumn ?
    Column<{
        readonly tableAlias : ItemT["tableAlias"];
        readonly name : ItemT["name"];
        readonly assertDelegate : ItemT["assertDelegate"];
    }> :
    ItemT extends IExprSelectItem ?
    FromExprSelectItem<ItemT> :
    never
);
export function fromSingleValueSelectItem<ItemT extends SingleValueSelectItem> (
    item : ItemT
) : FromSingleValueSelectItem<ItemT> {
    if (isColumn(item)) {
        return new Column(item) as any;
    } else if (ExprSelectItemUtil.isExprSelectItem(item)) {
        return fromExprSelectItem(item) as any;
    } else {
        throw new Error(`Unknown SingleValueSelectItem`);
    }
}

export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    ColumnMapT extends ColumnMap ?
    ColumnMapT[Extract<keyof ColumnMapT, string>] :
    never
);
export type FromJoin<JoinT extends IJoin> = (
    JoinT extends IJoin ?
    FromColumnMap<
        ColumnMapUtil.FromJoin<JoinT>
    > :
    never
);
export type FromJoinArray<JoinsT extends IJoin[]> = (
    FromJoin<JoinsT[number]>
);

export type FromColumnRef<ColumnRefT extends ColumnRef> = (
    ColumnRefT extends ColumnRef ?
    FromColumnMap<ColumnRefT[keyof ColumnRefT]> :
    never
);