import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const column = o.column("tableAlias", "name", sd.unsignedInteger());
    const item : o.IExprSelectItem<{
        readonly usedRef : {
            someTable : {
                someColumn : o.IColumn<{
                    tableAlias : "someTable",
                    name : "someColumn",
                    assertDelegate : sd.SafeMapper<boolean>,
                }>
            }
        };
        readonly assertDelegate : sd.SafeMapper<Date>;

        readonly tableAlias : "someTableAlias";
        readonly alias : "someAlias";
    }> = {
        usedRef : {
            someTable : {
                someColumn : new o.Column<{
                    tableAlias : "someTable",
                    name : "someColumn",
                    assertDelegate : sd.SafeMapper<boolean>,
                }>({
                    tableAlias : "someTable",
                    name : "someColumn",
                    assertDelegate : sd.boolean(),
                }),
            },
        },
        assertDelegate : sd.mysql.dateTime(3),

        tableAlias : "someTableAlias",
        alias : "someAlias",
        unaliasedQuery : "NOT IMPLEMENTED",
    };
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.unsignedInteger(),
            y : sd.mysql.dateTime(3),
            z : sd.instanceOfBuffer(),
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
                ax : sd.unsignedInteger(),
                ay : sd.string(),
            }
        ),
        o.ColumnMapUtil.fromAssertMap(
            "tableB",
            {
                bx : sd.boolean(),
                by : sd.instanceOfBuffer(),
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

    const fromSelects = o.ColumnMapUtil.fromSelectItemArray(selectItemArray, "test");

    t.true(o.ColumnMapUtil.isColumnMap(fromSelects));
    t.deepEqual(Object.keys(fromSelects).length, 9);

    t.deepEqual(fromSelects.name.tableAlias, "test");
    t.deepEqual(fromSelects.name.name, "name");
    t.deepEqual(fromSelects.name.assertDelegate("", 89), 89);

    t.deepEqual(fromSelects.someAlias.tableAlias, "test");
    t.deepEqual(fromSelects.someAlias.name, "someAlias");
    t.deepEqual(fromSelects.someAlias.assertDelegate("", new Date("9999-01-01")), new Date("9999-01-01"));

    t.deepEqual(fromSelects.x.tableAlias, "test");
    t.deepEqual(fromSelects.x.name, "x");
    t.deepEqual(fromSelects.x.assertDelegate("", 33), 33);

    t.deepEqual(fromSelects.y.tableAlias, "test");
    t.deepEqual(fromSelects.y.name, "y");
    t.deepEqual(fromSelects.y.assertDelegate("", new Date(9999999)), new Date(9999999));

    t.deepEqual(fromSelects.z.tableAlias, "test");
    t.deepEqual(fromSelects.z.name, "z");
    t.deepEqual(fromSelects.z.assertDelegate("", Buffer.from("test")), Buffer.from("test"));

    t.deepEqual(fromSelects.ax.tableAlias, "test");
    t.deepEqual(fromSelects.ax.name, "ax");
    t.deepEqual(fromSelects.ax.assertDelegate("", 87), 87);

    t.deepEqual(fromSelects.ay.tableAlias, "test");
    t.deepEqual(fromSelects.ay.name, "ay");
    t.deepEqual(fromSelects.ay.assertDelegate("", "-----"), "-----");

    t.deepEqual(fromSelects.bx.tableAlias, "test");
    t.deepEqual(fromSelects.bx.name, "bx");
    t.deepEqual(fromSelects.bx.assertDelegate("", true), true);
    t.deepEqual(fromSelects.bx.assertDelegate("", false), false);

    t.deepEqual(fromSelects.by.tableAlias, "test");
    t.deepEqual(fromSelects.by.name, "by");
    t.deepEqual(fromSelects.by.assertDelegate("", Buffer.from("whatisthis")), Buffer.from("whatisthis"));

    t.end();
});