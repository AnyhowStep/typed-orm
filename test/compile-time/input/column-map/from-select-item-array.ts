import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const column = o.column("tableAlias", "name", sd.naturalNumber());
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
export const columnMap = o.ColumnMapUtil.fromAssertMap(
    "someTable",
    {
        x : sd.naturalNumber(),
        y : sd.date(),
        z : sd.buffer(),
    }
);
export const emptyColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someEmptyTable",
    {}
);
export const mixedColumnMap = o.ColumnMapUtil.intersect(
    o.ColumnMapUtil.fromAssertMap(
        "tableA",
        {
            ax : sd.naturalNumber(),
            ay : sd.string(),
        }
    ),
    o.ColumnMapUtil.fromAssertMap(
        "tableB",
        {
            bx : sd.boolean(),
            by : sd.buffer(),
        }
    )
);

export declare const selectItemArray : [
    typeof column,
    typeof item,
    typeof columnMap,
    typeof emptyColumnMap,
    typeof mixedColumnMap
];
export const fromSelects = o.ColumnMapUtil.fromSelectItemArray(selectItemArray, "test");