import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const column = o.column("tableAlias", "name", sd.naturalNumber());

    const fromSelectItem = o.ColumnMapUtil.fromSelectItem(column);

    t.true(o.ColumnMapUtil.isColumnMap(fromSelectItem));
    t.deepEqual(Object.keys(fromSelectItem).length, 1);

    t.deepEqual(fromSelectItem.name.tableAlias, "tableAlias");
    t.deepEqual(fromSelectItem.name.name, "name");
    t.deepEqual(fromSelectItem.name.assertDelegate("", 89), 89);

    t.end();
});

tape(__filename, (t) => {
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

    const fromSelectItem = o.ColumnMapUtil.fromSelectItem(item);

    t.true(o.ColumnMapUtil.isColumnMap(fromSelectItem));
    t.deepEqual(Object.keys(fromSelectItem).length, 1);

    t.deepEqual(fromSelectItem.someAlias.tableAlias, "someTableAlias");
    t.deepEqual(fromSelectItem.someAlias.name, "someAlias");
    t.deepEqual(fromSelectItem.someAlias.assertDelegate("", new Date("9999-01-01")), new Date("9999-01-01"));

    t.end();
});

tape(__filename, (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.naturalNumber(),
            y : sd.date(),
            z : sd.buffer(),
        }
    );

    const fromSelectItem = o.ColumnMapUtil.fromSelectItem(columnMap);

    t.true(o.ColumnMapUtil.isColumnMap(fromSelectItem));
    t.deepEqual(Object.keys(fromSelectItem).length, 3);

    t.deepEqual(fromSelectItem.x.tableAlias, "someTable");
    t.deepEqual(fromSelectItem.x.name, "x");
    t.deepEqual(fromSelectItem.x.assertDelegate("", 33), 33);

    t.deepEqual(fromSelectItem.y.tableAlias, "someTable");
    t.deepEqual(fromSelectItem.y.name, "y");
    t.deepEqual(fromSelectItem.y.assertDelegate("", new Date(9999999)), new Date(9999999));

    t.deepEqual(fromSelectItem.z.tableAlias, "someTable");
    t.deepEqual(fromSelectItem.z.name, "z");
    t.deepEqual(fromSelectItem.z.assertDelegate("", Buffer.from("test")), Buffer.from("test"));

    t.end();
});

tape(__filename, (t) => {
    const emptyColumnMap = o.ColumnMapUtil.fromAssertMap(
        "someEmptyTable",
        {}
    );

    const fromSelectItem = o.ColumnMapUtil.fromSelectItem(emptyColumnMap);

    t.true(o.ColumnMapUtil.isColumnMap(fromSelectItem));
    t.deepEqual(Object.keys(fromSelectItem).length, 0);

    t.end();
});

tape(__filename, (t) => {
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

    const fromSelectItem = o.ColumnMapUtil.fromSelectItem(mixedColumnMap);

    t.true(o.ColumnMapUtil.isColumnMap(fromSelectItem));
    t.deepEqual(Object.keys(fromSelectItem).length, 4);

    t.deepEqual(fromSelectItem.ax.tableAlias, "tableA");
    t.deepEqual(fromSelectItem.ax.name, "ax");
    t.deepEqual(fromSelectItem.ax.assertDelegate("", 87), 87);

    t.deepEqual(fromSelectItem.ay.tableAlias, "tableA");
    t.deepEqual(fromSelectItem.ay.name, "ay");
    t.deepEqual(fromSelectItem.ay.assertDelegate("", "-----"), "-----");

    t.deepEqual(fromSelectItem.bx.tableAlias, "tableB");
    t.deepEqual(fromSelectItem.bx.name, "bx");
    t.deepEqual(fromSelectItem.bx.assertDelegate("", true), true);
    t.deepEqual(fromSelectItem.bx.assertDelegate("", false), false);

    t.deepEqual(fromSelectItem.by.tableAlias, "tableB");
    t.deepEqual(fromSelectItem.by.name, "by");
    t.deepEqual(fromSelectItem.by.assertDelegate("", Buffer.from("whatisthis")), Buffer.from("whatisthis"));

    t.end();
});