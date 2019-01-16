import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

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
    const c = o.ColumnUtil.fromSingleValueSelectItem(item);

    t.deepEqual(
        c.tableAlias,
        "someTableAlias"
    );
    t.deepEqual(
        c.name,
        "someAlias"
    );

    t.throws(() => {
        c.assertDelegate("d", true);
    });
    t.throws(() => {
        c.assertDelegate("d", false);
    });

    t.deepEqual(
        c.assertDelegate("d", new Date(11111)),
        new Date(11111)
    );
    t.deepEqual(
        c.assertDelegate("d", "2018-01-01"),
        new Date("2018-01-01")
    );

    const c2 = new o.Column(
        {
            tableAlias : "tableAlias",
            name : "name",
            assertDelegate : sd.naturalNumber()
        },
        undefined
    );
    const c3 = o.ColumnUtil.fromSingleValueSelectItem(c2);

    t.deepEqual(
        c3.tableAlias,
        "tableAlias"
    );
    t.deepEqual(
        c3.name,
        "name"
    );

    t.deepEqual(
        c3.assertDelegate("d", 0),
        0
    );
    t.deepEqual(
        c3.assertDelegate("d", 777),
        777
    );

    t.end();
});
tape(__filename, (t) => {
    t.throws(() => {
        o.ColumnUtil.fromSingleValueSelectItem(123 as any);
    });
    t.throws(() => {
        o.ColumnUtil.fromSingleValueSelectItem([] as any);
    });
    t.throws(() => {
        o.ColumnUtil.fromSingleValueSelectItem((()=>o.column("a", "b", o.bigint())) as any);
    });
    t.throws(() => {
        o.ColumnUtil.fromSingleValueSelectItem((new Date()) as any);
    });
    t.throws(() => {
        o.ColumnUtil.fromSingleValueSelectItem(({}) as any);
    });
    t.end();
});