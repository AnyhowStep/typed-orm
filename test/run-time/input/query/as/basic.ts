import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    const query = o.from(table)
        .select(c => [c.z, c.x, c.y]);
    const aliased = query
        .as("aliased");

    t.true(o.AliasedTableUtil.isAliasedTable(aliased));

    t.deepEqual(aliased.usedRef, {});
    t.deepEqual(aliased.alias, "aliased");
    t.true(o.ColumnMapUtil.isColumnMap(aliased.columns));
    t.deepEqual(Object.keys(aliased.columns).length, 3);

    t.deepEqual(aliased.columns.x.tableAlias, "aliased");
    t.deepEqual(aliased.columns.x.name, "x");
    t.deepEqual(aliased.columns.x.assertDelegate, query._selects[1].assertDelegate);

    t.deepEqual(aliased.columns.y.tableAlias, "aliased");
    t.deepEqual(aliased.columns.y.name, "y");
    t.deepEqual(aliased.columns.y.assertDelegate, query._selects[2].assertDelegate);

    t.deepEqual(aliased.columns.z.tableAlias, "aliased");
    t.deepEqual(aliased.columns.z.name, "z");
    t.deepEqual(aliased.columns.z.assertDelegate, query._selects[0].assertDelegate);

    t.end();
});
