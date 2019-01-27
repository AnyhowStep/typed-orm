import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const column = o.column("tableAlias", "name", sd.naturalNumber());
export const columnMap = o.ColumnMapUtil.fromSingleValueSelectItem(column);

export declare const untypedColumn : o.IColumn;
export const untypedColumnMap = o.ColumnMapUtil.fromSingleValueSelectItem(untypedColumn);

export declare const item : o.IExprSelectItem<{
    readonly usedColumns : o.IColumn<{
        tableAlias : "someTable",
        name : "someColumn",
        assertDelegate : sd.AssertDelegate<boolean>,
    }>[];
    readonly assertDelegate : sd.AssertDelegate<Date>;

    readonly tableAlias : "someTableAlias";
    readonly alias : "someAlias";
}>;
export const itemColumnMap = o.ColumnMapUtil.fromSingleValueSelectItem(item);

export declare const untypedItem : o.IExprSelectItem;
export const untypedItemColumnMap = o.ColumnMapUtil.fromSingleValueSelectItem(untypedItem);