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
    const joined1 = o.table(
        "joined1",
        {
            a : sd.mysql.dateTime(3),
            b : sd.instanceOfBuffer(),
            y : sd.string()
        }
    ).setPrimaryKey(c => [c.y]);

    const query = o.from(table)
        .innerJoinPk(
            t => t.table,
            joined1
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
    t.deepEqual(query._joins[1].nullable, false);
    t.deepEqual(query._joins[1].joinType, o.JoinType.INNER);
    t.deepEqual(query._joins[1].from.length, 1);
    t.deepEqual(query._joins[1].from[0], table.columns.y);
    t.deepEqual(query._joins[1].to.length, 1);
    t.deepEqual(query._joins[1].to[0], joined1.columns.y);

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
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );
    const joined1 = o.table(
        "joined1",
        {
            a : sd.mysql.dateTime(3),
            b : sd.instanceOfBuffer(),
            y : sd.string()
        }
    );
    const joined2 = o.table(
        "joined2",
        {
            a : sd.null(),
            b : sd.instanceOfBuffer(),
            x : sd.unsignedInteger()
        }
    );

    const query = o.from(table)
        .innerJoinUsing(
            joined1,
            c => [c.y]
        )
        .innerJoinUsing(
            joined2,
            c => {
                //This test just shows that while `a` might
                //not exist during compile-time,
                //(joined1.a, Date and joined2.a, null are incompatible)
                //it certainly exists during run-time because
                //we can't test for assert delegate compatibility
                //during run-time.
                //We probably could *approximate* it but doing
                //so would be costly.
                //The drawbacks of not having reflection, I guess.
                t.deepEqual((c.joined1 as any).a, joined1.columns.a);
                return [c.table.x, c.joined1.b];
            }
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
    t.deepEqual(query._joins[1].to[0], joined1.columns.y);

    t.equal(query._joins[2].aliasedTable, joined2);
    t.equal(query._joins[2].columns, joined2.columns);
    t.deepEqual(query._joins[2].nullable, false);
    t.deepEqual(query._joins[2].joinType, o.JoinType.INNER);
    t.deepEqual(query._joins[2].from.length, 2);
    t.deepEqual(query._joins[2].from[0], table.columns.x);
    t.deepEqual(query._joins[2].from[1], joined1.columns.b);
    t.deepEqual(query._joins[2].to.length, 2);
    t.deepEqual(query._joins[2].to[0], joined2.columns.x);
    t.deepEqual(query._joins[2].to[1], joined2.columns.b);

    t.deepEqual(query._parentJoins, undefined);
    t.deepEqual(query._unions, undefined);
    t.deepEqual(query._selects, undefined);
    t.deepEqual(query._limit, undefined);
    t.deepEqual(query._unionLimit, undefined);

    t.deepEqual(query._where, undefined);

    t.end();
});