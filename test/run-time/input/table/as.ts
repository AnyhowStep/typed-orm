import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const tableSrc = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );
    const table = tableSrc.as("aliasedTable")

    t.true(o.AliasedTableUtil.isAliasedTable(table));
    t.deepEqual(table.alias, "aliasedTable");


    t.true(o.ColumnMapUtil.isColumnMap(table.columns));
    t.deepEqual(Object.keys(table.columns).length, 3);

    t.deepEqual(table.columns.x.tableAlias, "aliasedTable");
    t.deepEqual(table.columns.x.name, "x");
    t.deepEqual(table.columns.x.assertDelegate("", 67), 67);

    t.deepEqual(table.columns.y.tableAlias, "aliasedTable");
    t.deepEqual(table.columns.y.name, "y");
    t.deepEqual(table.columns.y.assertDelegate("", "hey"), "hey");

    t.deepEqual(table.columns.z.tableAlias, "aliasedTable");
    t.deepEqual(table.columns.z.name, "z");
    t.deepEqual(table.columns.z.assertDelegate("", true), true);
    t.deepEqual(table.columns.z.assertDelegate("", false), false);

    t.end();
});

tape(__filename, (t) => {
    const tableSrc = o.table(
        "table",
        {}
    );
    const table = tableSrc.as("emptyAliasedTable")

    t.true(o.AliasedTableUtil.isAliasedTable(table));
    t.deepEqual(table.alias, "emptyAliasedTable");


    t.true(o.ColumnMapUtil.isColumnMap(table.columns));
    t.deepEqual(Object.keys(table.columns).length, 0);

    t.end();
});