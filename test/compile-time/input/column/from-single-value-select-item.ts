import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export declare const item : o.IExprSelectItem<{
    readonly usedRef : {
        someTable : {
            someColumn : o.IColumn<{
                tableAlias : "someTable",
                name : "someColumn",
                assertDelegate : sd.AssertDelegate<boolean>,
            }>
        }
    };
    readonly assertDelegate : sd.AssertDelegate<Date>;

    readonly tableAlias : "someTableAlias";
    readonly alias : "someAlias";
}>;
export const c = o.Column.fromSingleValueSelectItem(item);

export const c2 = o.column("tableAlias", "columnName", sd.varChar(255));
export const c3 = o.Column.fromSingleValueSelectItem(c2);