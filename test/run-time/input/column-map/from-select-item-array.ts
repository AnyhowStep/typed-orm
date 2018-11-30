import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const column = o.column("tableAlias", "name", sd.naturalNumber());
    const item : o.IExprSelectItem<{
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
    }> = {
        usedRef : {
            someTable : {
                someColumn : new o.Column<{
                    tableAlias : "someTable",
                    name : "someColumn",
                    assertDelegate : sd.AssertDelegate<boolean>,
                }>({
                    tableAlias : "someTable",
                    name : "someColumn",
                    assertDelegate : sd.boolean(),
                }),
            },
        },
        assertDelegate : sd.date(),

        tableAlias : "someTableAlias",
        alias : "someAlias",
        unaliasedQuery : "NOT IMPLEMENTED",
    };
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.naturalNumber(),
            y : sd.date(),
            z : sd.buffer(),
        }
    );
    const emptyColumnMap = o.ColumnMapUtil.fromAssertMap(
        "someEmptyTable",
        {}
    );
    const mixedColumnMap = o.ColumnMapUtil.intersect(
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

    const selectItemArray : [
        typeof column,
        typeof item,
        typeof columnMap,
        typeof emptyColumnMap,
        typeof mixedColumnMap
    ] = [
        column,
        item,
        columnMap,
        emptyColumnMap,
        mixedColumnMap
    ];

    const fromSelects = o.ColumnMapUtil.fromSelectItemArray(selectItemArray);

    t.true(o.ColumnMapUtil.isColumnMap(fromSelects));
    t.deepEqual(Object.keys(fromSelects).length, 9);

    t.deepEqual(fromSelects.name.tableAlias, "tableAlias");
    t.deepEqual(fromSelects.name.name, "name");
    t.deepEqual(fromSelects.name.assertDelegate("", 89), 89);

    t.deepEqual(fromSelects.someAlias.tableAlias, "someTableAlias");
    t.deepEqual(fromSelects.someAlias.name, "someAlias");
    t.deepEqual(fromSelects.someAlias.assertDelegate("", new Date("9999-01-01")), new Date("9999-01-01"));

    t.deepEqual(fromSelects.x.tableAlias, "someTable");
    t.deepEqual(fromSelects.x.name, "x");
    t.deepEqual(fromSelects.x.assertDelegate("", 33), 33);

    t.deepEqual(fromSelects.y.tableAlias, "someTable");
    t.deepEqual(fromSelects.y.name, "y");
    t.deepEqual(fromSelects.y.assertDelegate("", new Date(9999999)), new Date(9999999));

    t.deepEqual(fromSelects.z.tableAlias, "someTable");
    t.deepEqual(fromSelects.z.name, "z");
    t.deepEqual(fromSelects.z.assertDelegate("", Buffer.from("test")), Buffer.from("test"));

    t.deepEqual(fromSelects.ax.tableAlias, "tableA");
    t.deepEqual(fromSelects.ax.name, "ax");
    t.deepEqual(fromSelects.ax.assertDelegate("", 87), 87);

    t.deepEqual(fromSelects.ay.tableAlias, "tableA");
    t.deepEqual(fromSelects.ay.name, "ay");
    t.deepEqual(fromSelects.ay.assertDelegate("", "-----"), "-----");

    t.deepEqual(fromSelects.bx.tableAlias, "tableB");
    t.deepEqual(fromSelects.bx.name, "bx");
    t.deepEqual(fromSelects.bx.assertDelegate("", true), true);
    t.deepEqual(fromSelects.bx.assertDelegate("", false), false);

    t.deepEqual(fromSelects.by.tableAlias, "tableB");
    t.deepEqual(fromSelects.by.name, "by");
    t.deepEqual(fromSelects.by.assertDelegate("", Buffer.from("whatisthis")), Buffer.from("whatisthis"));

    t.end();
});