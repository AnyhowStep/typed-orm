import * as sd from "type-mapping";
import * as o from "../../../../../dist/src/main";
import * as tape from "tape";
import * as fs from "fs";

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
            x : sd.finiteNumber(),
            y : sd.string()
        }
    ).addCandidateKey(c => [c.x]);

    const j1 = o.innerJoinCkUsing(
        table,
        joined1,
        t => [t.x]
    );
    const query = o.from(table)
        .useJoin(j1);

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTreeJoins(query)
    );
    const actual = formatter.format(sql);
    t.deepEqual(
        actual,
        fs.readFileSync(
            __filename.replace(/\.ts$/, ".sql")
        ).toString()
    );

    t.end();
});