import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    const query = o.from(table);

    t.true(o.Query.isQuery(query));

    t.deepEqual(query.joins.length, 1);
    t.equal(query.joins[0].aliasedTable, table);
    t.equal(query.joins[0].columns, table.columns);
    t.deepEqual(query.joins[0].nullable, false);
    t.deepEqual(query.joins[0].joinType, o.JoinType.FROM);
    t.deepEqual(query.joins[0].from.length, 0);
    t.deepEqual(query.joins[0].to.length, 0);

    t.deepEqual(query.parentJoins, undefined);
    t.deepEqual(query.unions, undefined);
    t.deepEqual(query.selects, undefined);
    t.deepEqual(query.limit, undefined);
    t.deepEqual(query.unionLimit, undefined);

    t.deepEqual(query.extraData.where, undefined);

    t.end();
});