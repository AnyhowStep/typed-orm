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
            y : sd.string()
        }
    );
    const joined2 = o.table(
        "joined2",
        {
            x : sd.naturalNumber(),
            b : sd.buffer(),
            l : sd.string()
        }
    );
    const query = o.from(table)
        .innerJoinUsing(
            joined1,
            c => [c.y, c.y]
        )
        .innerJoinUsing(
            joined2,
            c => [c.table.x, c.joined1.b]
        );

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTreeJoins(query)
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