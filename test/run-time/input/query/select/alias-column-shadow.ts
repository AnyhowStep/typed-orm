import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

/*
    TODO Make it so you cannot "shadow" columns in
    JOINs using a column alias
*/
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
        .select(c => [c.z.as("x")])
        .andHaving(c => {
            t.deepEqual(c.x, o.ColumnUtil.fromExprSelectItem(table.columns.z.as("x")));
            t.notDeepEqual(c.x, table.columns.x);
            return c.x;
        });

    t.true(o.SelectItemArrayUtil.isSelectItemArray(query._selects));
    t.deepEqual(query._selects.length, 1);

    t.deepEqual(query._selects[0], table.columns.z.as("x"));
    t.notDeepEqual(query._selects[0], table.columns.x);

    t.end();
});