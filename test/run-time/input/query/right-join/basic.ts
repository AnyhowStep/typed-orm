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
        .rightJoin(
            joined1,
            c => [c.y],
            t => [t.c]
        );

    t.true(o.QueryUtil.isQuery(query));

    t.deepEqual(query.joins.length, 2);

    t.equal(query.joins[0].aliasedTable, table);
    t.equal(query.joins[0].columns, table.columns);
    t.deepEqual(query.joins[0].nullable, true);
    t.deepEqual(query.joins[0].joinType, o.JoinType.FROM);
    t.deepEqual(query.joins[0].from.length, 0);
    t.deepEqual(query.joins[0].to.length, 0);

    t.equal(query.joins[1].aliasedTable, joined1);
    t.equal(query.joins[1].columns, joined1.columns);
    t.deepEqual(query.joins[1].nullable, false);
    t.deepEqual(query.joins[1].joinType, o.JoinType.RIGHT);
    t.deepEqual(query.joins[1].from.length, 1);
    t.deepEqual(query.joins[1].from[0], table.columns.y);
    t.deepEqual(query.joins[1].to.length, 1);
    t.deepEqual(query.joins[1].to[0], joined1.columns.c);

    t.deepEqual(query.parentJoins, undefined);
    t.deepEqual(query.unions, undefined);
    t.deepEqual(query.selects, undefined);
    t.deepEqual(query.limit, undefined);
    t.deepEqual(query.unionLimit, undefined);

    t.deepEqual(query.extraData.where, undefined);

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
    const joined3 = o.table(
        "joined3",
        {
            d : sd.date(),
            e : sd.buffer(),
            f : sd.string()
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
        )
        .rightJoin(
            joined3,
            c => [c.table.y, c.joined1.a, c.joined2.k],
            t => [t.f, t.d, t.e]
        );

    t.true(o.QueryUtil.isQuery(query));

    t.deepEqual(query.joins.length, 4);

    t.equal(query.joins[0].aliasedTable, table);
    t.equal(query.joins[0].columns, table.columns);
    t.deepEqual(query.joins[0].nullable, true);
    t.deepEqual(query.joins[0].joinType, o.JoinType.FROM);
    t.deepEqual(query.joins[0].from.length, 0);
    t.deepEqual(query.joins[0].to.length, 0);

    t.equal(query.joins[1].aliasedTable, joined1);
    t.equal(query.joins[1].columns, joined1.columns);
    t.deepEqual(query.joins[1].nullable, true);
    t.deepEqual(query.joins[1].joinType, o.JoinType.INNER);
    t.deepEqual(query.joins[1].from.length, 1);
    t.deepEqual(query.joins[1].from[0], table.columns.y);
    t.deepEqual(query.joins[1].to.length, 1);
    t.deepEqual(query.joins[1].to[0], joined1.columns.c);

    t.equal(query.joins[2].aliasedTable, joined2);
    t.equal(query.joins[2].columns, joined2.columns);
    t.deepEqual(query.joins[2].nullable, true);
    t.deepEqual(query.joins[2].joinType, o.JoinType.LEFT);
    t.deepEqual(query.joins[2].from.length, 2);
    t.deepEqual(query.joins[2].from[0], table.columns.y);
    t.deepEqual(query.joins[2].from[1], joined1.columns.a);
    t.deepEqual(query.joins[2].to.length, 2);
    t.deepEqual(query.joins[2].to[0], joined2.columns.l);
    t.deepEqual(query.joins[2].to[1], joined2.columns.j);

    t.equal(query.joins[3].aliasedTable, joined3);
    t.equal(query.joins[3].columns, joined3.columns);
    t.deepEqual(query.joins[3].nullable, false);
    t.deepEqual(query.joins[3].joinType, o.JoinType.RIGHT);
    t.deepEqual(query.joins[3].from.length, 3);
    t.deepEqual(query.joins[3].from[0], table.columns.y);
    t.deepEqual(query.joins[3].from[1], joined1.columns.a);
    t.true(o.ColumnIdentifierUtil.isEqual(
        query.joins[3].from[2],
        joined2.columns.k
    ));
    //The LEFT JOIN makes the column nullable
    //So, the `assertDelegate` field will be different from the original table,
    //where the original is not nullable
    //t.deepEqual(query.joins[3].from[2], joined2.columns.k);
    t.deepEqual(query.joins[3].to.length, 3);
    t.deepEqual(query.joins[3].to[0], joined3.columns.f);
    t.deepEqual(query.joins[3].to[1], joined3.columns.d);
    t.deepEqual(query.joins[3].to[2], joined3.columns.e);

    t.deepEqual(query.parentJoins, undefined);
    t.deepEqual(query.unions, undefined);
    t.deepEqual(query.selects, undefined);
    t.deepEqual(query.limit, undefined);
    t.deepEqual(query.unionLimit, undefined);

    t.deepEqual(query.extraData.where, undefined);

    t.end();
});