import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
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
    const c = o.ColumnUtil.fromExprSelectItem(item);

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

    t.end();
});