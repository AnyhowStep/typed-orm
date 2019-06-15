import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../../dist/src/main";

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
            c : sd.string()
        }
    )

    const query = o.from(table)
        .innerJoin(
            o.from(joined1)
                .select(c => [c.c])
                .as("subQuery"),
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

    t.deepEqual(query._joins[1].aliasedTable.usedRef, {});
    t.deepEqual(query._joins[1].aliasedTable.alias, "subQuery");
    t.deepEqual(query._joins[1].aliasedTable.columns, {
        c : joined1.columns.c.withTableAlias("subQuery")
    });
    t.deepEqual(query._joins[1].columns, {
        c : joined1.columns.c.withTableAlias("subQuery")
    });
    t.deepEqual(query._joins[1].nullable, false);
    t.deepEqual(query._joins[1].joinType, o.JoinType.INNER);
    t.deepEqual(query._joins[1].from.length, 1);
    t.deepEqual(query._joins[1].from[0], table.columns.y);
    t.deepEqual(query._joins[1].to.length, 1);
    t.deepEqual(query._joins[1].to[0], joined1.columns.c.withTableAlias("subQuery"));

    t.deepEqual(query._parentJoins, undefined);
    t.deepEqual(query._unions, undefined);
    t.deepEqual(query._selects, undefined);
    t.deepEqual(query._limit, undefined);
    t.deepEqual(query._unionLimit, undefined);

    t.deepEqual(query._where, undefined);

    t.end();
});