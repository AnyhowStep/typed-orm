import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const parent = o.table(
        "parent",
        {
            a : sd.naturalNumber(),
            b : sd.string(),
            c : sd.boolean(),
        }
    );
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    const query = o.from(table)
        .requireParentJoins(parent)
        .select(c => [c.table.z, c.table.x, c.table.y, c.parent.a])

    const aliased = query
        .as("aliased");

    t.true(o.AliasedTable.isAliasedTable(aliased));

    t.deepEqual(aliased.usedRef, {
        parent : parent.columns
    });
    t.deepEqual(aliased.alias, "aliased");
    t.true(o.ColumnMapUtil.isColumnMap(aliased.columns));
    t.deepEqual(Object.keys(aliased.columns).length, 4);

    t.deepEqual(aliased.columns.x.tableAlias, "aliased");
    t.deepEqual(aliased.columns.x.name, "x");
    t.deepEqual(aliased.columns.x.assertDelegate, query._selects[1].assertDelegate);

    t.deepEqual(aliased.columns.y.tableAlias, "aliased");
    t.deepEqual(aliased.columns.y.name, "y");
    t.deepEqual(aliased.columns.y.assertDelegate, query._selects[2].assertDelegate);

    t.deepEqual(aliased.columns.z.tableAlias, "aliased");
    t.deepEqual(aliased.columns.z.name, "z");
    t.deepEqual(aliased.columns.z.assertDelegate, query._selects[0].assertDelegate);

    t.deepEqual(aliased.columns.a.tableAlias, "aliased");
    t.deepEqual(aliased.columns.a.name, "a");
    t.deepEqual(aliased.columns.a.assertDelegate, query._selects[3].assertDelegate);

    t.end();
});
