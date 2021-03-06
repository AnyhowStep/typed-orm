import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    const query = o.from(table);

    t.true(o.QueryUtil.isQuery(query));

    t.deepEqual(query._joins.length, 1);
    t.equal(query._joins[0].aliasedTable, table);
    t.equal(query._joins[0].columns, table.columns);
    t.deepEqual(query._joins[0].nullable, false);
    t.deepEqual(query._joins[0].joinType, o.JoinType.FROM);
    t.deepEqual(query._joins[0].from.length, 0);
    t.deepEqual(query._joins[0].to.length, 0);

    t.deepEqual(query._parentJoins, undefined);
    t.deepEqual(query._unions, undefined);
    t.deepEqual(query._selects, undefined);
    t.deepEqual(query._limit, undefined);
    t.deepEqual(query._unionLimit, undefined);

    t.deepEqual(query._where, undefined);

    t.end();
});