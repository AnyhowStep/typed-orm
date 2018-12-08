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
            a : sd.date(),
            b : sd.buffer(),
            c : sd.string()
        }
    );

    const query = o.from(table)
        .leftJoin(
            joined1,
            c => [c.y],
            t => [t.c]
        );

    t.true(o.QueryUtil.isQuery(query));

    t.deepEqual(query._joins.length, 2);

    t.equal(query._joins[0].aliasedTable, table);
    t.equal(query._joins[0].columns, table.columns);
    t.deepEqual(query._joins[0].nullable, false);
    t.deepEqual(query._joins[0].joinType, o.JoinType.FROM);
    t.deepEqual(query._joins[0].from.length, 0);
    t.deepEqual(query._joins[0].to.length, 0);

    t.equal(query._joins[1].aliasedTable, joined1);
    t.equal(query._joins[1].columns, joined1.columns);
    t.deepEqual(query._joins[1].nullable, true);
    t.deepEqual(query._joins[1].joinType, o.JoinType.LEFT);
    t.deepEqual(query._joins[1].from.length, 1);
    t.deepEqual(query._joins[1].from[0], table.columns.y);
    t.deepEqual(query._joins[1].to.length, 1);
    t.deepEqual(query._joins[1].to[0], joined1.columns.c);

    t.deepEqual(query._parentJoins, undefined);
    t.deepEqual(query._unions, undefined);
    t.deepEqual(query._selects, undefined);
    t.deepEqual(query._limit, undefined);
    t.deepEqual(query._unionLimit, undefined);

    t.deepEqual(query._where, undefined);

    t.end();
});

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
            a : sd.date(),
            b : sd.buffer(),
            c : sd.string()
        }
    );
    const joined2 = o.table(
        "joined2",
        {
            j : sd.date(),
            k : sd.buffer(),
            l : sd.string()
        }
    );

    const query = o.from(table)
        .innerJoin(
            joined1,
            c => [c.y],
            t => [t.c]
        )
        .leftJoin(
            joined2,
            c => [c.table.y, c.joined1.a],
            t => [t.l, t.j]
        );

    t.true(o.QueryUtil.isQuery(query));

    t.deepEqual(query._joins.length, 3);

    t.equal(query._joins[0].aliasedTable, table);
    t.equal(query._joins[0].columns, table.columns);
    t.deepEqual(query._joins[0].nullable, false);
    t.deepEqual(query._joins[0].joinType, o.JoinType.FROM);
    t.deepEqual(query._joins[0].from.length, 0);
    t.deepEqual(query._joins[0].to.length, 0);

    t.equal(query._joins[1].aliasedTable, joined1);
    t.equal(query._joins[1].columns, joined1.columns);
    t.deepEqual(query._joins[1].nullable, false);
    t.deepEqual(query._joins[1].joinType, o.JoinType.INNER);
    t.deepEqual(query._joins[1].from.length, 1);
    t.deepEqual(query._joins[1].from[0], table.columns.y);
    t.deepEqual(query._joins[1].to.length, 1);
    t.deepEqual(query._joins[1].to[0], joined1.columns.c);

    t.equal(query._joins[2].aliasedTable, joined2);
    t.equal(query._joins[2].columns, joined2.columns);
    t.deepEqual(query._joins[2].nullable, true);
    t.deepEqual(query._joins[2].joinType, o.JoinType.LEFT);
    t.deepEqual(query._joins[2].from.length, 2);
    t.deepEqual(query._joins[2].from[0], table.columns.y);
    t.deepEqual(query._joins[2].from[1], joined1.columns.a);
    t.deepEqual(query._joins[2].to.length, 2);
    t.deepEqual(query._joins[2].to[0], joined2.columns.l);
    t.deepEqual(query._joins[2].to[1], joined2.columns.j);

    t.deepEqual(query._parentJoins, undefined);
    t.deepEqual(query._unions, undefined);
    t.deepEqual(query._selects, undefined);
    t.deepEqual(query._limit, undefined);
    t.deepEqual(query._unionLimit, undefined);

    t.deepEqual(query._where, undefined);

    t.end();
});