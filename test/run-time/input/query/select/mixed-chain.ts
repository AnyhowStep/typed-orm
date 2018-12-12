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
    const joined1 = o.table(
        "joined1",
        {
            a : sd.naturalNumber(),
            b : sd.string(),
            c : sd.boolean(),
        }
    );

    const query = o.from(table)
        .select(c => [c.z])
        .select(c => [c.x.as("aliased")])
        .select(c => [o.eq(c.y, c.y).as("equal?"), c.x, c.y])
        .innerJoin(
            joined1,
            c => [c.z, c.y],
            t => [t.c, t.b]
        )
        .select(
            c => [c.joined1, o.eq(c.joined1.a, c.table.x).as("thisEqual?")]
        );

    t.deepEqual(query._selects.length, 7);

    t.deepEqual(query._selects[0], table.columns.z);

    t.deepEqual(query._selects[1].tableAlias, "table");
    t.deepEqual(query._selects[1].alias, "aliased");
    t.deepEqual(query._selects[1].assertDelegate, table.columns.x.assertDelegate);
    t.deepEqual(query._selects[1].unaliasedQuery, table.columns.x.queryTree());
    t.deepEqual(query._selects[1].usedRef, o.ColumnRefUtil.fromColumn(table.columns.x));

    t.deepEqual(query._selects[2].tableAlias, o.ALIASED);
    t.deepEqual(query._selects[2].alias, "equal?");
    t.deepEqual(query._selects[2].assertDelegate("", true), true);
    t.deepEqual(query._selects[2].assertDelegate("", false), false);
    t.deepEqual(query._selects[2].assertDelegate("", 1), true);
    t.deepEqual(query._selects[2].assertDelegate("", 0), false);
    t.deepEqual(query._selects[2].unaliasedQuery, o.Parentheses.Create([
        table.columns.y.queryTree(),
        "=",
        table.columns.y.queryTree(),
    ]));
    //t.deepEqual(query._selects[2].usedRef, o.ColumnRefUtil.fromColumn(table.columns.y));

    t.deepEqual(query._selects[3], table.columns.x);
    t.deepEqual(query._selects[4], table.columns.y);

    t.deepEqual(query._selects[5], joined1.columns);

    t.deepEqual(query._selects[6].tableAlias, o.ALIASED);
    t.deepEqual(query._selects[6].alias, "thisEqual?");
    t.deepEqual(query._selects[6].assertDelegate("", true), true);
    t.deepEqual(query._selects[6].assertDelegate("", false), false);
    t.deepEqual(query._selects[6].assertDelegate("", 1), true);
    t.deepEqual(query._selects[6].assertDelegate("", 0), false);
    t.deepEqual(query._selects[6].unaliasedQuery, o.Parentheses.Create([
        joined1.columns.a.queryTree(),
        "=",
        table.columns.x.queryTree(),
    ]));
    t.deepEqual(query._selects[6].usedRef, o.ColumnRefUtil.fromColumnArray([
        joined1.columns.a,
        table.columns.x
    ]));

    t.end();
});