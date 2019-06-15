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
            b : sd.finiteNumber(),
            y : sd.string()
        }
    );
    const joined2 = o.table(
        "joined2",
        {
            n : sd.mysql.dateTime(3),
            m : sd.finiteNumber(),
            o : sd.string()
        }
    );

    const j1 = o.innerJoin(
        table,
        joined1,
        t => [t.x],
        t => [t.b]
    );
    const j2 = o.innerJoin(
        joined1,
        joined2,
        t => [t.a, t.y],
        t => [t.n, t.o]
    );
    const query = o.from(table)
        .useJoins(j1, j2);

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