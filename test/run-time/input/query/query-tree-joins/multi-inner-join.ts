import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import * as fs from "fs";

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
            c => [c.y, c.y],
            t => [t.c, t.c]
        )
        .innerJoin(
            joined2,
            c => [c.table.y, c.joined1.a],
            t => [t.l, t.j]
        );

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.Query.queryTreeJoins(query)
    );
    const actual = formatter.format(sql);
    t.deepEqual(
        actual,
        fs.readFileSync(
            __filename.replace(/\.ts$/, "-expected.sql")
        ).toString()
    );

    t.end();
});