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
        .select(c => [c.x.as("a"), c.y.as("b"), c.z.as("c")]);

    t.deepEqual(query._selects.length, 3);

    t.deepEqual(query._selects[0].tableAlias, "table");
    t.deepEqual(query._selects[0].alias, "a");
    t.deepEqual(query._selects[0].assertDelegate, table.columns.x.assertDelegate);
    t.deepEqual(query._selects[0].unaliasedQuery, o.ColumnUtil.queryTree(table.columns.x));
    t.deepEqual(query._selects[0].usedRef, o.ColumnRefUtil.fromColumn(table.columns.x));

    t.deepEqual(query._selects[1].tableAlias, "table");
    t.deepEqual(query._selects[1].alias, "b");
    t.deepEqual(query._selects[1].assertDelegate, table.columns.y.assertDelegate);
    t.deepEqual(query._selects[1].unaliasedQuery, o.ColumnUtil.queryTree(table.columns.y));
    t.deepEqual(query._selects[1].usedRef, o.ColumnRefUtil.fromColumn(table.columns.y));

    t.deepEqual(query._selects[2].tableAlias, "table");
    t.deepEqual(query._selects[2].alias, "c");
    t.deepEqual(query._selects[2].assertDelegate, table.columns.z.assertDelegate);
    t.deepEqual(query._selects[2].unaliasedQuery, o.ColumnUtil.queryTree(table.columns.z));
    t.deepEqual(query._selects[2].usedRef, o.ColumnRefUtil.fromColumn(table.columns.z));

    t.end();
});