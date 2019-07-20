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
            w : sd.unsignedInteger(),
        }
    );

    const query = o.from(table).select(c => [
        o.eq(c.x, c.w).as("equal?")
    ]);

    t.deepEqual(query._selects.length, 1);

    t.deepEqual(query._selects[0].tableAlias, o.ALIASED);
    t.deepEqual(query._selects[0].alias, "equal?");
    t.deepEqual(query._selects[0].assertDelegate("", true), true);
    t.deepEqual(query._selects[0].assertDelegate("", false), false);
    t.deepEqual(query._selects[0].assertDelegate("", 1), true);
    t.deepEqual(query._selects[0].assertDelegate("", 0), false);
    t.deepEqual(query._selects[0].unaliasedQuery, o.Parentheses.Create([
        o.ColumnUtil.queryTree(table.columns.x),
        "=",
        o.ColumnUtil.queryTree(table.columns.w),
    ]));
    t.deepEqual(query._selects[0].usedRef, {});

    t.end();
});