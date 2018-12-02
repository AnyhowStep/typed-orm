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
        .innerJoin(
            joined1,
            c => [c.y],
            t => [t.c]
        );

    t.true(o.Query.isQuery(query));

    t.deepEqual(query.joins.length, 2);

    t.equal(query.joins[0].aliasedTable, table);
    t.equal(query.joins[0].columns, table.columns);
    t.deepEqual(query.joins[0].nullable, false);
    t.deepEqual(query.joins[0].joinType, o.JoinType.FROM);
    t.deepEqual(query.joins[0].from.length, 0);
    t.deepEqual(query.joins[0].to.length, 0);

    t.equal(query.joins[1].aliasedTable, joined1);
    t.equal(query.joins[1].columns, joined1.columns);
    t.deepEqual(query.joins[1].nullable, false);
    t.deepEqual(query.joins[1].joinType, o.JoinType.INNER);
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