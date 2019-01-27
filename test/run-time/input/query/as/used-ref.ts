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
        .select(c => [c.table.z, c.table.x, c.table.y])

    const aliased = query
        .as("aliased");

    t.true(o.AliasedTableUtil.isAliasedTable(aliased));

    t.deepEqual(aliased.usedColumns, o.ColumnUtil.Array.fromColumnMap(
        parent.columns
    ));
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
