import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );
    const query = o.from(table)
        .select(c => [c.x.as("a"), c.y.as("b"), c.z.as("c")]);

    t.deepEqual(query._selects.length, 3);

    t.deepEqual(query._selects[0].tableAlias, "table");
    t.deepEqual(query._selects[0].alias, "a");
    t.deepEqual(query._selects[0].assertDelegate, table.columns.x.assertDelegate);
    t.deepEqual(query._selects[0].unaliasedQuery, o.ColumnUtil.queryTree(table.columns.x));
    t.deepEqual(query._selects[0].usedRef, {});

    t.deepEqual(query._selects[1].tableAlias, "table");
    t.deepEqual(query._selects[1].alias, "b");
    t.deepEqual(query._selects[1].assertDelegate, table.columns.y.assertDelegate);
    t.deepEqual(query._selects[1].unaliasedQuery, o.ColumnUtil.queryTree(table.columns.y));
    t.deepEqual(query._selects[1].usedRef, {});

    t.deepEqual(query._selects[2].tableAlias, "table");
    t.deepEqual(query._selects[2].alias, "c");
    t.deepEqual(query._selects[2].assertDelegate, table.columns.z.assertDelegate);
    t.deepEqual(query._selects[2].unaliasedQuery, o.ColumnUtil.queryTree(table.columns.z));
    t.deepEqual(query._selects[2].usedRef, {});

    t.end();
});